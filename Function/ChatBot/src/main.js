import OpenAI from 'openai';

export default async ({ req, res, log, error }) => {
  res.json({
    message: 'Hello World'
  });
};
