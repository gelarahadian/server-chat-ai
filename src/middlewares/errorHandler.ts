import { NextFunction, Request, Response } from "express";

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    res
      .status(err?.status || 500)
      .json({ message: err?.message || "Sever Error" });
}

export default errorHandler