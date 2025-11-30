import { Router } from "express";
import multer from "multer";

import auth from "./authRoute";
import chat from "./chatRoute";

const upload = multer();

const api = Router().use(auth).use(chat);

export default Router().use('/api',upload.none(), api);