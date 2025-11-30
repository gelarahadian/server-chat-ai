import { NotFoundError } from "../errors/NotFoundError";
import Conversation from "../models/Conversation";
import { findConversationById } from "../repositories/conversation.repository";

export const handleFindConversationService = async (conversationId: string) => {
  const conversation = await findConversationById(conversationId);

  if(!conversation) throw new NotFoundError("Conversation not found!");

  return conversation
};