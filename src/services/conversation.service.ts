import { BadRequestError } from "../errors/BadRequestError";
import { FrobiddenError } from "../errors/ForbiddenError";
import { NotFoundError } from "../errors/NotFoundError";
import {
  deleteConversationById,
  findConversationById,
  searchConversation,
} from "../repositories/conversation.repository";
import {
  createSharedConversation,
  findSharedConversationByConversationId,
} from "../repositories/shared-conversation.repository";
import { nanoid } from "nanoid";

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

export const handleShareConversationService = async (
  conversationId: string,
  userId: string
) => {
  const conv = await findConversationById(conversationId);

  if (!conv) throw new NotFoundError("Conversation not found!");

  if (conv.user_id.toString() !== userId) {
    throw new FrobiddenError("Forbidden: Not your conversation!");
  }

  const sharedConv = await findSharedConversationByConversationId(
    conversationId
  );

  if (sharedConv) return sharedConv;

  const share_token = nanoid(16);

  return await createSharedConversation({
    conversation_id: conversationId,
    share_token,
    shared_by: userId,
  });
};
