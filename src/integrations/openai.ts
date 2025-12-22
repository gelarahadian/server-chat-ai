import OpenAI from "openai";
const client = new OpenAI();

type chat = {
  role: "system" | "assistant" | "user";
  content: string;
};

export const askToAi = async (message: chat[]) => {
  const response = await client.responses.create({
    model: "gpt-5-nano",
    input: [
      {
        role: "system",
        content:
          "Answer using Markdown, and When writing code, you MUST use Markdown code blocks with triple backticks and specify the language.",
      },
      ...message,
    ],
  });

  return response;
};

export const generateTitle = async (message: string) => {
  const response = await client.chat.completions.create({
    model: "gpt-5-nano",
    messages: [
      {
        role: "system",
        content:
          "You are a title generator. Output ONLY a short title (max 6 words). No explanations. No punctuation. No markdown.",
      },
      { role: "user", content: message },
    ],
  });

  const raw = response?.choices?.[0]?.message?.content ?? "";

  const trimmed = raw.trim();

  const words = trimmed.split(/\s+/).filter(Boolean);

  const limited = words.length > 6 ? words.slice(0, 6).join(" ") : trimmed;

  const cleaned = limited.replace(/[^\p{L}\p{N}\s]/gu, "");

  return cleaned;
};

