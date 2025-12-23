import { Request, Response } from "express";
import { handleFindShareConversationService } from "../services/share-conversation.service";

export const findShareConversationConntroller = async (req: Request, res: Response) => {
    const {token} = req.params
    try {
        const sharedConv = await handleFindShareConversationService(token)

        res.status(200).json({
            data: sharedConv
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