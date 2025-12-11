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
    if (conversation.user_id.toString() !== userId)
      throw new FrobiddenError("It's not your conversation");
  }
  const responseAi = await askToAi(input);
  const chatUser = await createChat({
    role: "user",
    content: input,
  });

  const chatAssistant = await createChat({
    role: "assistant",
    content: responseAi.output_text,
  });

  if (!conversation) {
    const title = await generateTitle(input);
    conversation = await createConversation({
      user_id: userId,
      title,
      messages: [chatUser, chatAssistant],
    });
  } else {
    conversation.messageIds.push(chatUser._id, chatAssistant._id);
    await conversation.save();
  }

  return conversation;
};
