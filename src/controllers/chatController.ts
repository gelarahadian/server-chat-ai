import { Request, Response } from "express";
import { handleChatService } from "../services/chat.service";

export const createChatController = async (req: Request, res: Response) => {
  try {
    const { conversationId, input } = req.body;

    if (!input) {
      res.status(400).json({ message: "Input cannot be empty" });
    }

    if (!req.userId) {
      res.status(401).json({ message: "User Not Authenticate" });
    }
    const result = await handleChatService(req.userId, input, conversationId);

    res.status(201).json({
      messages: "Chat Successfull",
      chat: result,
    });
  } catch (err: any) {
    console.error("Error:", err);
    return res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }
};
