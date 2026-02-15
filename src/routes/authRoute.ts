import express from 'express';
import { me, signIn, signOut, signUp } from "../controllers/auth.controller";
import authenticate from "../middlewares/authentication";

const router = express.Router();

router.post("/auth/sign-up", signUp);
router.post("/auth/sign-in", signIn);
router.post("/auth/sign-out", signOut);
router.get("/auth/me", authenticate, me);

export default router;