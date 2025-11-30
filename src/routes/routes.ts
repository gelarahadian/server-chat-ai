import { Router } from "express";
import multer from "multer";

import auth from "./authRoute";
import chat from "./chatRoute";
import conversation from "./conversationRoute";

const upload = multer();

const api = Router().use(auth).use(chat).use(conversation);

export default Router().use('/api',upload.none(), api);