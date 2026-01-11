import { Router } from "express";
import multer from "multer";
import auth from "./authRoute";
import chat from "./chatRoute";
import conversation from "./conversationRoute";
import share from "./shareRoute";

const upload = multer();

const api = Router().use(auth).use(chat).use(conversation).use(share);

export default Router().use('/api',upload.none(), api);