import Groq from 'groq-sdk';
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
      role: entry.role,
      content: entry.content,
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
    return JSON.parse(trimmedBody);
  }

  return { message: trimmedBody };
}

function parseToolArguments(argumentsText) {
  if (!argumentsText) {
    return {};
  }

  if (typeof argumentsText !== 'string') {
    return argumentsText;
  }

  try {
    return JSON.parse(argumentsText);
  } catch {
    return {};
  }
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

export default async ({ req, res, log, error }) => {
  let contactDraft = null;

  try {
    const data = parseRequestBody(req.body);
    const message = extractUserMessage(data);
    const history = normalizeHistory(data?.history);

    if (!message) {
      throw new Error('Message field is missing');
    }

    const client = new Groq({ apiKey: process.env.GROQ_API_KEY });
    const messages = [
      { role: 'system', content: buildPortfolioSystemPrompt() },
      ...history,
      { role: 'user', content: message },
    ];

    // FIX 2: Updated fallback model to a valid Groq Llama 3 model
    const model = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile';
    const temperature = Number(process.env.GROQ_TEMPERATURE ?? 1);
    const topP = Number(process.env.GROQ_TOP_P ?? 1);
    const maxTokens = Number(process.env.GROQ_MAX_COMPLETION_TOKENS ?? 2048);

    const runCompletion = async () =>
      client.chat.completions.create({
        model,
        messages,
        // FIX 4: Only pass tools array if it has items to avoid 400 errors
        tools: portfolioTools?.length > 0 ? portfolioTools : undefined,
        temperature,
        top_p: topP,
        max_tokens: maxTokens, // FIX 1: max_tokens instead of max_completion_tokens
        stream: false,
      });

    let assistantMessage = (await runCompletion()).choices?.[0]?.message;

    if (!assistantMessage) {
      throw new Error('Groq returned an empty response');
    }

    if (assistantMessage.tool_calls?.length) {
      // FIX 4: Ensure content is at least null when pushing tool calls back
      messages.push({
        ...assistantMessage,
        content: assistantMessage.content || null,
      });

      for (const toolCall of assistantMessage.tool_calls) {
        const toolName = toolCall.function?.name;
        const toolArguments = parseToolArguments(toolCall.function?.arguments);

        // FIX 3: Add await just in case your tool function handles async DB/Email operations
        const toolResult = await getPortfolioToolResult(
          toolName,
          toolArguments
        );

        if (toolName === 'prepare_contact_form') {
          contactDraft = toolResult;
        }

        // FIX 4: Safely stringify the result and provide the tool name
        const stringifiedResult =
          typeof toolResult === 'string'
            ? toolResult
            : JSON.stringify(toolResult);

        messages.push({
          role: 'tool',
          tool_call_id: toolCall.id,
          name: toolName,
          content: stringifiedResult || 'null',
        });
      }

      // Run completion again with the tool results
      assistantMessage = (await runCompletion()).choices?.[0]?.message;

      if (!assistantMessage) {
        throw new Error('Groq returned an empty response after tool use');
      }
    }

    const reply = assistantMessage.content?.trim() || '';

    if (!reply) {
      const fallbackReply = getFallbackReply();
      log('Groq returned no final text; using fallback reply');
      return res.json({
        success: true,
        reply: fallbackReply,
        contactDraft,
      });
    }

    log('Chatbot generated reply via Groq');
    log({ success: true, reply, contactDraft });
    return res.json({ success: true, reply, contactDraft });
  } catch (err) {
    const message = err?.message || String(err);
    const failedGeneration = extractFailedGeneration(err);

    if (message.includes('tool_use_failed') && failedGeneration) {
      log(
        'Groq tool call failed; returning failed_generation as fallback reply'
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
