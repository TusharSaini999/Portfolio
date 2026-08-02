import { GoogleGenAI } from '@google/genai';
import { AI_CONFIG } from './Config/ai.js';
import {
  buildPortfolioSystemPrompt,
  getPortfolioToolResult,
  portfolioTools,
} from './Data/Data.js';

function normalizeHistory(history) {
  if (!Array.isArray(history)) {
    return [];
  }

  return history
    .filter(
      (entry) =>
        entry &&
        typeof entry === 'object' &&
        typeof entry.role === 'string' &&
        typeof entry.content === 'string'
    )
    .slice(-5)
    .map((entry) => ({
      role:
        entry.role === 'assistant'
          ? 'model'
          : entry.role === 'user'
            ? 'user'
            : 'user',
      parts: [{ text: entry.content }],
    }));
}

function extractUserMessage(data) {
  if (typeof data === 'string') {
    return data.trim();
  }

  return data?.message || data?.prompt || data?.query || data?.text || '';
}

function parseRequestBody(body) {
  if (body == null) {
    return { message: '' };
  }

  if (typeof body !== 'string') {
    return body;
  }

  const trimmedBody = body.trim();

  if (!trimmedBody) {
    return { message: '' };
  }

  if (trimmedBody.startsWith('{') || trimmedBody.startsWith('[')) {
    try {
      return JSON.parse(trimmedBody);
    } catch {
      return { message: trimmedBody };
    }
  }

  return { message: trimmedBody };
}

function extractFailedGeneration(err) {
  const directFailedGeneration =
    err?.error?.failed_generation || err?.failed_generation;

  if (
    typeof directFailedGeneration === 'string' &&
    directFailedGeneration.trim()
  ) {
    return directFailedGeneration.trim();
  }

  const rawMessage = err?.message;

  if (typeof rawMessage !== 'string') {
    return '';
  }

  const jsonStart = rawMessage.indexOf('{');

  if (jsonStart < 0) {
    return '';
  }

  try {
    const parsed = JSON.parse(rawMessage.slice(jsonStart));
    return parsed?.error?.failed_generation?.trim?.() || '';
  } catch {
    return '';
  }
}

function getFallbackReply() {
  return "I couldn't generate a direct answer from the available portfolio data. Please ask about skills, projects, experience, credentials, or contact details.";
}

const apiKeys = (process.env.GEMINI_API_KEY || '')
  .split(',')
  .map((k) => k.trim())
  .filter(Boolean);

let currentKeyIndex = 0;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function executeWithRetry(operation, logFn = null) {
  if (apiKeys.length === 0) {
    throw new Error('GEMINI_API_KEY environment variable is missing or empty.');
  }

  const maxRetries = apiKeys.length * 3; // Try each key up to 3 times
  let attempt = 0;

  while (attempt < maxRetries) {
    try {
      currentKeyIndex = (currentKeyIndex + 1) % apiKeys.length;
      const keyToUse = apiKeys[currentKeyIndex];
      return await operation(keyToUse);
    } catch (err) {
      const isRateLimit =
        err?.status === 429 ||
        err?.message?.includes('429') ||
        err?.message?.includes('Too Many Requests') ||
        err?.message?.includes('quota') ||
        err?.message?.includes('ResourceExhausted');

      if (isRateLimit && attempt < maxRetries - 1) {
        attempt++;

        // If we have cycled through all available keys, then we wait
        if (attempt % apiKeys.length === 0) {
          const cycle = Math.floor(attempt / apiKeys.length);
          const waitTime = Math.pow(2, cycle) * 5000 + Math.random() * 2000;
          if (logFn) {
            logFn(
              `All keys hit rate limit (429). Retrying in ${Math.round(waitTime)}ms (Cycle ${cycle})...`
            );
          }
          await delay(waitTime);
        } else {
          if (logFn) {
            logFn(`Key rate limited. Instantly switching to next API key...`);
          }
        }
      } else {
        throw err;
      }
    }
  }
}

export default async ({ req, res, log, error }) => {
  let contactDraft = null;

  try {
    const data = parseRequestBody(req.body);
    const message = extractUserMessage(data);
    const history = normalizeHistory(data?.history);

    if (!message) {
      throw new Error('Message field is missing');
    }

    // Map portfolioTools to Gemini's expected functionDeclarations structure
    const functionDeclarations = portfolioTools.map((t) => t.function);
    const geminiTools =
      functionDeclarations.length > 0 ? [{ functionDeclarations }] : undefined;

    const contents = [...history, { role: 'user', parts: [{ text: message }] }];

    const runCompletion = async () =>
      executeWithRetry(async (apiKey) => {
        const ai = new GoogleGenAI({ apiKey });
        return await ai.models.generateContent({
          model: AI_CONFIG.MODEL,
          contents,
          config: {
            systemInstruction: buildPortfolioSystemPrompt(),
            tools: geminiTools,
            temperature: AI_CONFIG.TEMPERATURE,
            topP: AI_CONFIG.TOP_P,
            maxOutputTokens: AI_CONFIG.MAX_OUTPUT_TOKENS,
          },
        });
      }, log);

    let response = await runCompletion();
    let functionCalls = response.functionCalls;

    if (functionCalls && functionCalls.length > 0) {
      // Append the model's response part which includes the function calls
      contents.push(response.candidates[0].content);

      const functionResponses = [];

      for (const toolCall of functionCalls) {
        const toolName = toolCall.name;
        // In @google/genai, tool arguments are an object directly
        const toolArguments = toolCall.args || {};
        const toolResult = getPortfolioToolResult(toolName, toolArguments);

        if (toolName === 'prepare_contact_form') {
          contactDraft = toolResult;
        }

        functionResponses.push({
          functionResponse: {
            name: toolName,
            response: toolResult,
          },
        });
      }

      // Provide the result of the function calls back to the model
      contents.push({
        role: 'user',
        parts: functionResponses,
      });

      // Call the model again with the function result
      response = await runCompletion();
    }

    const reply = response.text?.trim() || '';

    if (!reply) {
      const fallbackReply = getFallbackReply();
      log('Gemini returned no final text; using fallback reply');
      return res.json({
        success: true,
        reply: fallbackReply,
        contactDraft,
      });
    }

    log('Chatbot generated reply via Gemini');
    log({ success: true, reply, contactDraft });
    return res.json({ success: true, reply, contactDraft });
  } catch (err) {
    const message = err?.message || String(err);
    const failedGeneration = extractFailedGeneration(err);

    if (message.includes('tool_use_failed') && failedGeneration) {
      log(
        'Gemini tool call failed; returning failed_generation as fallback reply'
      );
      return res.json({
        success: true,
        reply: failedGeneration,
        contactDraft,
      });
    }

    error(message);

    return res.json({
      success: true,
      reply: getFallbackReply(),
      contactDraft,
    });
  }
};
