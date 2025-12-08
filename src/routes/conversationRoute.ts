import express from "express";
import authenticate from "../middlewares/authentication";
import {
  deleteConversationController,
  findConversatioinController,
  listConversationController,
} from "../controllers/conversation.controller";

const router = express.Router();

router.get("/conversations", authenticate, listConversationController);
router.get(
  "/conversation/:conversationId",
  authenticate,
  findConversatioinController
);
router.delete(
  "/conversation/:conversationId",
  authenticate,
  deleteConversationController
);

export default router;
