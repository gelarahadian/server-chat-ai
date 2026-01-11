import express from 'express'
import cors from "cors";
import logger from "./middlewares/logger";
import { errorHandler } from "./middlewares/errorHandler";
import routes from "./routes/routes";
import connectDB from "./config/db";

const app: express.Application = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: "*",
    allowedHeaders: "*",
  })
);

app.use(logger);
app.use(errorHandler);
app.use(routes);

connectDB();

app.get("/", (req, res) => {
  res.send("TypeScript With Express");
});


export default app

