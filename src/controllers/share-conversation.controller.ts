import { Request, Response } from "express";
import { handleFindShareConversationService } from "../services/share-conversation.service";
import { NextFunction } from "express";

export const findShareConversationConntroller = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.params;
  try {
    const sharedConv = await handleFindShareConversationService(token);

    res.status(200).json({
      data: sharedConv,
    });
  } catch (err: any) {
    next(err);
  }
};