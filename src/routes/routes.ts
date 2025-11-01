import { Router } from "express";
import multer from "multer";

import auth from "./authRoute";

const upload = multer()

const api = Router().use(auth);

export default Router().use('/api',upload.none(), api);