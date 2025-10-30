import express from 'express'
import logger from './middlewares/logger';
import errorHandler from './middlewares/errorHandler';

const app: express.Application = express();

app.use(logger);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("TypeScript With Express");
});

export default app

