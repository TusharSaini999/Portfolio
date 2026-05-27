import Groq from 'groq-sdk';
import { buildPortfolioSystemPrompt, getPortfolioToolResult, portfolioTools } from './Data/Data.js';

function normalizeHistory(history) {
  if (!Array.isArray(history)) {
    return [];
  }

  return history
    .filter((entry) => entry && typeof entry === 'object' && typeof entry.role === 'string' && typeof entry.content === 'string')
    .map((entry) => ({
      role: entry.role,
      content: entry.content,
    }));
}

function extractUserMessage(data) {
  return data?.message || data?.prompt || data?.query || data?.text || '';
}

export default async ({ req, res, log, error }) => {
  try {
    const data = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const message = extractUserMessage(data);
    const history = normalizeHistory(data?.history);

    if (!process.env.GROQ_API_KEY) {
      throw new Error('GROQ_API_KEY is not configured');
    }

    if (!message) {
      throw new Error('Message field is missing');
    }

    const client = new Groq({ apiKey: process.env.GROQ_API_KEY });
    const messages = [{ role: 'system', content: buildPortfolioSystemPrompt() }, ...history, { role: 'user', content: message }];

    const model = process.env.GROQ_MODEL || 'openai/gpt-oss-120b';
    const temperature = Number(process.env.GROQ_TEMPERATURE ?? 1);
    const topP = Number(process.env.GROQ_TOP_P ?? 1);
    const maxCompletionTokens = Number(process.env.GROQ_MAX_COMPLETION_TOKENS ?? 8192);
    const reasoningEffort = process.env.GROQ_REASONING_EFFORT || 'medium';
    const maxToolRounds = Number(process.env.GROQ_MAX_TOOL_ROUNDS ?? 4);

    for (let round = 0; round < maxToolRounds; round += 1) {
      const completion = await client.chat.completions.create({
        model,
        messages,
        tools: portfolioTools,
        temperature,
        top_p: topP,
        max_completion_tokens: maxCompletionTokens,
        reasoning_effort: reasoningEffort,
        stream: false,
      });

      const assistantMessage = completion.choices?.[0]?.message;

      if (!assistantMessage) {
        throw new Error('Groq returned an empty response');
      }

      if (assistantMessage.tool_calls?.length) {
        messages.push(assistantMessage);

        for (const toolCall of assistantMessage.tool_calls) {
          const toolName = toolCall.function?.name;
          const toolResult = getPortfolioToolResult(toolName);

          messages.push({
            role: 'tool',
            tool_call_id: toolCall.id,
            content: JSON.stringify(toolResult),
          });
        }

        continue;
      }

      const reply = assistantMessage.content?.trim() || '';

      if (!reply) {
        throw new Error('Groq did not return a final answer');
      }

      log('Chatbot generated reply via Groq');

      return res.json({ success: true, reply });
    }

    throw new Error('Tool loop limit reached before producing a final answer');
  } catch (err) {
    error(err?.message || err);
    return res.json({ success: false, error: err?.message || String(err) });
  }
};
