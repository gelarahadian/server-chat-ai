import { Request, Response } from "express";
import { listConversation } from "../repositories/conversation.repository";
import { handleFindConversationService } from "../services/conversation.service";

export const listConversationController = async (req: Request, res: Response) => {
    try {
        const conversations = await listConversation(req.userId);
        res.status(200).json({
            conversations
        })
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
}

export const findConversatioinController = async (req: Request, res: Response) => {
  const {conversationId} = req.params
    try {
        const conversation = await handleFindConversationService(conversationId)

        res.status(200).json({
          message: "Get conversation successfully!",
          conversation
        })
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
}