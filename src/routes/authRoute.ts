import express from 'express';
import { me, signIn, signUp } from '../controllers/authController';

const router = express.Router();

router.post('/sign-up', signUp);
router.post('/sign-in', signIn);
router.get('/me', me);

export default router;