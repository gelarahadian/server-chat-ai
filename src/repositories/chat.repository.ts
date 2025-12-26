import { Types } from "mongoose";
import Chat from "../models/Chat";

export const createChat = async (data: any) => {
  const chat = await Chat.create(data);
  return chat;
};

export const findChatByIds = async (chatIds: string[]) => {
  const objectIds = chatIds.map((id) => new Types.ObjectId(id));

  return await Chat.aggregate([
    {
      $match: {
        _id: { $in: objectIds },
      },
    },
    {
      $addFields: {
        order: { $indexOfArray: [objectIds, "$_id"] },
      },
    },
    {
      $sort: { order: 1 },
    },
    {
      $project: {
        _id: 0,
        order: 0,
        created_at: 0,
        __v: 0,
      },
    },
  ]);
};
