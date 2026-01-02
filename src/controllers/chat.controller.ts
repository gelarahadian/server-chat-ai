import { Request, Response } from "express";
import {
  handleChatService,
  handleChatServiceStream,
} from "../services/chat.service";
import { askToAiStream } from "../integrations/openai";
import OpenAI from "openai";

export const createChatController = async (req: Request, res: Response) => {
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
    if (err.statusCode) {
      return res.status(err.statusCode).json({
        message: err.message,
      });
    }
    console.error("Error:", err);
    return res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }
};

export const createChatControllerStream = async (
  req: Request,
  res: Response
) => {
  const { input, conversationId, chatIds } = req.body;
  const userId = req.userId;

  await handleChatServiceStream(
    req,
    res,
    userId,
    input,
    conversationId,
    chatIds
  );
};