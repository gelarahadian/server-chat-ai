import express from "express";
import authenticate from "../middlewares/authentication";
import { findConversatioinController, listConversationController } from "../controllers/conversation.controller";

const router = express.Router();

router.get("/conversation", authenticate, listConversationController);
router.get("/conversation/:conversationId", authenticate, findConversatioinController);

export default router;
