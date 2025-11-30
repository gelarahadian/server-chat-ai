import Chat from "../models/Chat";

export const createChat = async (data: any) => {
  const chat = await Chat.create(data);
  return chat;
};
