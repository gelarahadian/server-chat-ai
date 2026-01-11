import { NextFunction, Request, Response } from "express";
import { listConversation } from "../repositories/conversation.repository";
import {
  handleDeleteConversationService,
  handleFindConversationService,
  handleSearchConversationService,
  handleShareConversationService,
} from "../services/conversation.service";
import { frontendUrl } from "../config/config";
import { BadRequestError } from "../errors/BadRequestError";

export const listConversationController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const conversations = await listConversation(req.userId);
    res.status(200).json({
      success: true,
      data: conversations,
    });
  } catch (err: any) {
    next(err);
  }
};

export const findConversationController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { conversationId } = req.params;
  try {
    const conversation = await handleFindConversationService(conversationId);

    res.status(200).json({
      success: true,
      data: conversation,
    });
  } catch (err: any) {
    next(err);
  }
};

export const searchConversationController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { q } = req.body;

  if (!q || typeof q !== "string") {
    throw new BadRequestError("Query is required");
  }

  try {
    const results = await handleSearchConversationService(q, req.userId);

    return res.status(200).json({
      success: true,
      data: results,
    });
  } catch (err: any) {
    next(err);
  }
};

export const deleteConversationController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { conversationId } = req.params;

  if (!conversationId) {
    return res.status(400).json({
      message: "conversationId is Required",
    });
  }
  try {
    const conversation = await handleDeleteConversationService(
      conversationId,
      req.userId
    );

    res.status(204).json({
      message: "Conversation successfully deleted",
      conversation,
    });
  } catch (err: any) {
    next(err);
  }
};

export const shareConversationController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { conversationId } = req.params;
  try {
    const sharedConversation = await handleShareConversationService(
      conversationId,
      req.userId
    );

    res.status(201).json({
      share_url: `${frontendUrl}/share/${sharedConversation.share_token}`,
    });
  } catch (err: any) {
    next(err);
  }
};
