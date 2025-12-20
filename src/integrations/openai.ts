import OpenAI from "openai";
const client = new OpenAI();

type chat = {
  role: "system" | "assistant" | "user";
  content: string;
};

export const askToAi = async (message: chat[]) => {
  const response = await client.responses.create({
    model: "gpt-5-nano",
    input: message,
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
  console.log(response.choices);

  return response.choices[0].message.content;
};

