import express from "express";
import authenticate from "../middlewares/authentication";
import {
  deleteConversationController,
  findConversatioinController,
  listConversationController,
  searchConversationController,
} from "../controllers/conversation.controller";

const router = express.Router();

router.get("/conversations", authenticate, listConversationController);
router.get(
  "/conversation/:conversationId",
  authenticate,
  findConversatioinController
);
router.get("/conversations/search", authenticate, searchConversationController);
router.delete(
  "/conversation/:conversationId",
  authenticate,
  deleteConversationController
);

export default router;
