import express from "express";
import {
  createChatController,
  createChatControllerStream,
} from "../controllers/chat.controller";
import authenticate from "../middlewares/authentication";

const router = express.Router();

router.post("/chat", authenticate, createChatController);
router.post("/chat/stream", authenticate, createChatControllerStream);

export default router;
