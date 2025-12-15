import { BadRequestError } from "../errors/BadRequestError";
import { FrobiddenError } from "../errors/ForbiddenError";
import { NotFoundError } from "../errors/NotFoundError";
import { askToAi, generateTitle } from "../integrations/openai";
import { createChat } from "../repositories/chat.repository";
import {
  createConversation,
  findConversationById,
} from "../repositories/conversation.repository";

export const handleChatService = async (
  userId: string,
  input: string,
  conversationId?: string
) => {
  let conversation;

  if (conversationId) {
    conversation = await findConversationById(conversationId);
    if (!conversation) throw new NotFoundError("Conversation not found");
    if (conversation.user_id.toString() !== userId) {
      throw new FrobiddenError("It's not your conversation");
    }
  }

  const MAX_HISTORY = 4;

  const chat_history =
    conversation?.messages.slice(-MAX_HISTORY).map((message: any) => {
      return {
        role: message.role,
        content: message.content,
      };
    }) ?? [];

  const chatUser = await createChat({
    role: "user",
    content: input,
  });

  const aiPromise = askToAi([
    {
      role: "system",
      content:
        "Answer using Markdown, and wrap all code with triple backticks according to the language.",
    },
    ...chat_history,
    { role: "user", content: input },
  ]);
  const titlePromise = conversation ? null : generateTitle(input);

  const responseAi = await aiPromise;

  const chatAssistant = await createChat({
    role: "assistant",
    content: responseAi.output_text,
  });

  if (!conversation) {
    const title = titlePromise ? await titlePromise : "New Chat";

    conversation = await createConversation({
      user_id: userId,
      title,
      messages: [chatUser._id, chatAssistant._id],
    });
  } else {
    conversation.messages.push(chatUser._id, chatAssistant._id);
    await conversation.save();
  }

  return conversation;
};
