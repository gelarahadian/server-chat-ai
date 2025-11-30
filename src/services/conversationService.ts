import Conversation from "../models/conversationModel";

export const createConversationService = async (data: any) => {
    const conversation = Conversation.create(data); 
    return conversation
};

export const getConversationByIdService = async (conversationId: string) => {
    const conversation = Conversation.findById(conversationId);
    return conversation
}
