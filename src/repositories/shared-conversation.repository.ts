import SharedConversation from "../models/SharedConversation"

export const findSharedConversationByConversationId = async (
  conversationId: string
) => {
  return await SharedConversation.findOne({ conversation_id: conversationId });
};

export const createSharedConversation = async (data: any) => {
  return await SharedConversation.create(data)
}
