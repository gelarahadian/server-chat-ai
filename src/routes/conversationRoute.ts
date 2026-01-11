import express from "express";
import authenticate from "../middlewares/authentication";
import {
  deleteConversationController,
  findConversationController,
  listConversationController,
  searchConversationController,
  shareConversationController,
} from "../controllers/conversation.controller";

const router = express.Router();

router.get("/conversations", authenticate, listConversationController);
router.get(
  "/conversation/:conversationId",
  authenticate,
  findConversationController
);
router.post(
  "/conversations/search",
  authenticate,
  searchConversationController
);
router.delete(
  "/conversation/:conversationId",
  authenticate,
  deleteConversationController
);

router.post(
  "/conversation/:conversationId/share",
  authenticate,
  shareConversationController
);

router.post("/conv/:id/sh", (req, res) => {
  res.send("yes");
});
export default router;
