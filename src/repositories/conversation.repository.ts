import Conversation from "../models/Conversation";



export const findConversationById = async (conversationId: string) => {
  return await Conversation.findById(conversationId);
};

export const findConversationByUser = async (userId: string) => {
  return await Conversation.findOne({ user_id: userId });
};

export const createConversation = async (data: any) => {
  return await Conversation.create(data);
};

export const saveConversation = async (conversation: any) => {
  return await conversation.save();
};
