import { Request, Response } from "express";
import { listConversation } from "../repositories/conversation.repository";
import {
  handleDeleteConversationService,
  handleFindConversationService,
  handleSearchConversationService,
  handleShareConversationService,
} from "../services/conversation.service";
import { frontendUrl } from "../config/config";

export const listConversationController = async (
  req: Request,
  res: Response
) => {
  try {
    const conversations = await listConversation(req.userId);
    res.status(200).json({
      conversations,
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

export const findConversatioinController = async (
  req: Request,
  res: Response
) => {
  const { conversationId } = req.params;
  try {
    const conversation = await handleFindConversationService(conversationId);

    res.status(200).json({
      message: "Get conversation successfully!",
      conversation,
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

export const searchConversationController = async (
  req: Request,
  res: Response
) => {
  const { q } = req.body;
  try {
    const results = await handleSearchConversationService(q, req.userId);

    return res.status(200).json({
      message: "Search successfully",
      results,
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

export const deleteConversationController = async (
  req: Request,
  res: Response
) => {
  const { conversationId } = req.params;

  if (!conversationId) {
    res.status(400).json({
      message: "conversationId is Required",
    });
  }
  try {
    const conversation = await handleDeleteConversationService(
      conversationId,
      req.userId
    );

    res.status(200).json({
      message: "Conversation successfully deleted",
      conversation,
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

export const shareConversationController = async (
  req: Request,
  res: Response
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