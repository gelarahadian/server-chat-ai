import express from 'express'
import cors from "cors";
import logger from "./middlewares/logger";
import { errorHandler } from "./middlewares/errorHandler";
import routes from "./routes/routes";
import connectDB from "./config/db";
import cookieParser from "cookie-parser";

const app: express.Application = express();

const allowedOrigins = (process.env.CORS_ORIGINS || "")
  .split(",")
  .filter(Boolean);

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
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

