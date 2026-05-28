import Groq from 'groq-sdk';
import { buildPortfolioSystemPrompt, getPortfolioToolResult, portfolioTools } from './Data/Data.js';

function normalizeHistory(history) {
  if (!Array.isArray(history)) {
    return [];
  }

  return history
    .filter((entry) => entry && typeof entry === 'object' && typeof entry.role === 'string' && typeof entry.content === 'string')
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

export default async ({ req, res, log, error }) => {
  try {
    const data = parseRequestBody(req.body);
    const message = extractUserMessage(data);
    const history = normalizeHistory(data?.history);
    let contactDraft = null;

    
    if (!message) {
      throw new Error('Message field is missing');
    }

    const client = new Groq({ apiKey: process.env.GROQ_API_KEY });
    const messages = [{ role: 'system', content: buildPortfolioSystemPrompt() }, ...history, { role: 'user', content: message }];

    const model = process.env.GROQ_MODEL || 'meta-llama/llama-4-scout-17b-16e-instruct';
    const temperature = Number(process.env.GROQ_TEMPERATURE ?? 1);
    const topP = Number(process.env.GROQ_TOP_P ?? 1);
    const maxCompletionTokens = Number(process.env.GROQ_MAX_COMPLETION_TOKENS ?? 1024);

    const runCompletion = async () =>
      client.chat.completions.create({
        model,
        messages,
        tools: portfolioTools,
        temperature,
        top_p: topP,
        max_completion_tokens: maxCompletionTokens,
        stream: false,
      });

    let assistantMessage = (await runCompletion()).choices?.[0]?.message;

    if (!assistantMessage) {
      throw new Error('Groq returned an empty response');
    }

    if (assistantMessage.tool_calls?.length) {
      messages.push(assistantMessage);

      for (const toolCall of assistantMessage.tool_calls) {
        const toolName = toolCall.function?.name;
        const toolArguments = parseToolArguments(toolCall.function?.arguments);
        const toolResult = getPortfolioToolResult(toolName, toolArguments);

        if (toolName === 'prepare_contact_form') {
          contactDraft = toolResult;
        }

        messages.push({
          role: 'tool',
          tool_call_id: toolCall.id,
          content: JSON.stringify(toolResult),
        });
      }

      assistantMessage = (await runCompletion()).choices?.[0]?.message;

      if (!assistantMessage) {
        throw new Error('Groq returned an empty response after tool use');
      }
    }

    const reply = assistantMessage.content?.trim() || '';

    if (!reply) {
      throw new Error('Groq did not return a final answer');
    }

    log('Chatbot generated reply via Groq');
    log({ success: true, reply, contactDraft });
    return res.json({ success: true, reply, contactDraft });
  } catch (err) {
    const message = err?.message || String(err);

    error(message);

    return res.json({ success: false, error: message });
  }
};
