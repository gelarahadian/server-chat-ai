import SharedConversation from "../models/SharedConversation"

export const findShareconversationByShareToken = async (shareToken: string) => {
  return await SharedConversation.findOne({ share_token: shareToken }).populate(
    {
      path: "conversation_id",
      populate: {
        path: "messages",
      },
    }
  );
};

export const findSharedConversationByConversationId = async (
  conversationId: string
) => {
  return await SharedConversation.findOne({ conversation_id: conversationId });
};

export const createSharedConversation = async (data: any) => {
  return await SharedConversation.create(data)
}
