import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function getGroqChatCompletion() {
  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: "Explain the importance of fast language models",
      },
    ],
    model: "openai/gpt-oss-20b",
  });
}

type chat = {
  role: "system" | "assistant" | "user";
  content: string;
};

export const askToAiStream = async (messages: any[], signal?: AbortSignal) => {
  return await groq.chat.completions.create({
    model: "openai/gpt-oss-20b",
    messages: [
      {
        role: "system",
        content:
          "Answer using Markdown, and When writing code, you MUST use Markdown code blocks with triple backticks and specify the language.",
      },
      ...messages,
    ],
    stream: true,
  });
};
export const generateTitle = async (messages: chat[]) => {
  const response = await groq.chat.completions.create({
    model: "openai/gpt-oss-20b",
    messages: [
      {
        role: "system",
        content:
          "You are a title generator. Output ONLY a short title (max 6 words). No explanations. No punctuation. No markdown.",
      },
      ...messages,
    ],
  });

  const raw = response?.choices?.[0]?.message?.content ?? "";

  const trimmed = raw.trim();

  const words = trimmed.split(/\s+/).filter(Boolean);

  const limited = words.length > 6 ? words.slice(0, 6).join(" ") : trimmed;

  const cleaned = limited.replace(/[^\p{L}\p{N}\s]/gu, "");

  return cleaned;
};