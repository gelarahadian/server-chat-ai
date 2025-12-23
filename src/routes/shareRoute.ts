import express from "express";
import { findShareConversationConntroller } from "../controllers/share-conversation.controller";

const router = express.Router();

router.get("/share/:token", findShareConversationConntroller);

export default router;
