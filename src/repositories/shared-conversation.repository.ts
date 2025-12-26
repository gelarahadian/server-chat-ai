import mongoose from "mongoose";
import SharedConversation from "../models/SharedConversation";

export const findShareconversationByShareToken = async (shareToken: string) => {
  return await SharedConversation.aggregate([
    {
      $match: {
        share_token: shareToken,
      },
    },
    {
      $lookup: {
        from: "conversations",
        localField: "conversation_id",
        foreignField: "_id",
        as: "conversation",
      },
    },
    {
      $unwind: "$conversation",
    },
    {
      $lookup: {
        from: "chats",
        localField: "conversation.messages",
        foreignField: "_id",
        as: "conversation.messages",
      },
    },
  ]);
};

export const findSharedConversationByConversationId = async (
  conversationId: string
) => {
  return await SharedConversation.findOne({ conversation_id: conversationId });
};

export const createSharedConversation = async (data: any) => {
  return await SharedConversation.create(data);
};
