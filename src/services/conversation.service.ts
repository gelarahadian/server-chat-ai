import { FrobiddenError } from "../errors/ForbiddenError";
import { NotFoundError } from "../errors/NotFoundError";
import Conversation from "../models/Conversation";
import {
  deleteConversationById,
  findConversationById,
  searchConversation,
} from "../repositories/conversation.repository";

export const handleFindConversationService = async (conversationId: string) => {
  const conversation = await findConversationById(conversationId);

  if (!conversation) throw new NotFoundError("Conversation not found!");

  return conversation;
};

export const handleSearchConversationService = async (
  q: string,
  userId: string
) => {
  return await searchConversation(q, userId);
};

export const handleDeleteConversationService = async (
  conversationId: string,
  userId: string
) => {
  const conv = await findConversationById(conversationId);

  if (!conv) throw new NotFoundError("Conversation not found!");

  if (conv.user_id.toString() !== userId) {
    throw new FrobiddenError("Forbidden: Not your conversation!");
  }

  return await deleteConversationById(conversationId);
};
