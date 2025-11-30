import express from "express";
import { createChatController } from "../controllers/chatController";
import authenticate from "../middlewares/authentication";

const router = express.Router();

router.post("/chat", authenticate, createChatController);

export default router;
