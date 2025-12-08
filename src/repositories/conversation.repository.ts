import Conversation from "../models/Conversation";

export const listConversation = async (userId: string) => {
  return await Conversation.find({ user_id: userId }).sort({ created_at: -1 });
};

export const findConversationById = async (conversationId: string) => {
  return await Conversation.findById(conversationId).populate("messages");
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

export const deleteConversationById = async (conversationId: string) => {
  return await Conversation.findOneAndDelete({ _id: conversationId });
};
