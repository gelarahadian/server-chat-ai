import { Request, Response } from "express";
import {
  handleChatService,
  handleChatServiceStream,
} from "../services/chat.service";
import { NextFunction } from "express";

export const createChatController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { conversationId, input, chatIds } = req.body;

    if (!input) {
      res.status(400).json({ message: "Input cannot be empty" });
    }

    if (!req.userId) {
      res.status(401).json({ message: "User Not Authenticate" });
    }
    const result = await handleChatService(
      req.userId,
      input,
      conversationId,
      chatIds
    );

    res.status(201).json({
      messages: "Chat Successfull",
      conversation: result,
    });
  } catch (err: any) {
    next(err);
  }
};

export const createChatControllerStream = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { input, conversationId, chatIds } = req.body;
  const userId = req.userId;

  if (!input) {
    res.status(400).json({ message: "Input cannot be empty" });
  }

  await handleChatServiceStream(
    req,
    res,
    userId,
    input,
    conversationId,
    chatIds
  );
};