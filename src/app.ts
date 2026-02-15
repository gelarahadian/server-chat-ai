import express from 'express'
import cors from "cors";
import logger from "./middlewares/logger";
import { errorHandler } from "./middlewares/errorHandler";
import routes from "./routes/routes";
import connectDB from "./config/db";
import cookieParser from "cookie-parser";

const app: express.Application = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "https://chat-ai-lar.vercel.app",
    credentials: true,
  }),
);

app.use(logger);
app.use(routes);
app.use(errorHandler);

connectDB();

app.get("/", (req, res) => {
  res.send("TypeScript With Express");
});


export default app

