import OpenAI from "openai";
const client = new OpenAI();

export const askToAi = async (message: string) => {
    const response = await client.responses.create({
      model: "gpt-5-nano",
      input: message,
    });

    return response
}

export const generateTitle = async (message: string) => {
  const response = await client.chat.completions.create({
    model: "gpt-5-nano",
    messages: [
      {
        role: "system",
        content: "Create a short title (max 6 words) for this conversation.",
      },
      { role: "user", content: message },
    ],
  });

  return response.choices[0].message.content;
};

