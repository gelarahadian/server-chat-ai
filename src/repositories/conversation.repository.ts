import mongoose from "mongoose";
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

export const searchConversation = async (q: string, userId: string) => {
  return await Conversation.aggregate([
    {
      $match: {
        user_id: new mongoose.Types.ObjectId(userId),
      },
    },
    {
      $lookup: {
        from: "chats",
        localField: "messages",
        foreignField: "_id",
        as: "messageObjects",
      },
    },
    {
      $match: {
        $or: [
          { user_id: userId },
          { title: { $regex: q, $options: "i" } },
          { "messageObjects.content": { $regex: q, $options: "i" } },
        ],
      },
    },
    {
      $addFields: {
        assistantMessages: {
          $filter: {
            input: "$messageObjects",
            as: "msg",
            cond: { $eq: ["$$msg.role", "assistant"] },
          },
        },
      },
    },
    {
      $addFields: {
        assistantMessage: {
          $arrayElemAt: ["$assistantMessages", 0],
        },
      },
    },
    {
      $sort: { created_at: -1 },
    },
    {
      $project: {
        user_id: 0,
        __v: 0,
        messages: 0,
        messageObjects: 0,
        assistantMessages: 0,
        "assistantMessage._id": 0,
        "assistantMessage.created_at": 0,
        "assistantMessage.__v": 0,
      },
    },
  ]);
};
