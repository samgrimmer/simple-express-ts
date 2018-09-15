import * as express from "express";
import { LoggerInstance } from "./logger";

export const RequestHandler: express.RequestHandler = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  LoggerInstance.Info("request caught in middleware example");
  return next();
};

export const ErrorHandler: express.ErrorRequestHandler = async (
  err: any,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  LoggerInstance.Error(
    `error caught in middleware example : error : ${err.message}`
  );
};

