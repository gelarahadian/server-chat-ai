import { askToAi, generateTitle } from "../integrations/openai";
import { createChat } from "../repositories/chat.repository";
import { createConversation, findConversationById } from "../repositories/conversation.repository";

export const handleChatService = async (
  userId: string,
  input: string,
  conversationId?: string,
) => {
  const responseAi = await askToAi(input);
  const chatUser = await createChat({
    role: "user",
    content: input,
  });

  const chatAssistant = await createChat({
    role: "assistant",
    content: responseAi.output_text,
  });

  if (!conversationId) {
    const title = await generateTitle(input);
    const conversation = await createConversation({
      user_id: userId,
      title,
      messages: [chatUser, chatAssistant],
    });
  } else {
    const conversation = await findConversationById(conversationId);
    if (!conversation) throw new Error("Conversation not found");
    conversation.messages.push(chatUser._id, chatAssistant._id)
    await conversation.save();
  }

  return chatAssistant
};