export const AI_CONFIG = {
  MODEL: process.env.GEMINI_MODEL || 'gemini-3.5-flash-lite',
  TEMPERATURE: Number(process.env.GEMINI_TEMPERATURE ?? 0.1),
  TOP_P: Number(process.env.GEMINI_TOP_P ?? 0.8),
  MAX_OUTPUT_TOKENS: Number(process.env.GEMINI_MAX_OUTPUT_TOKENS ?? 1024),
};
