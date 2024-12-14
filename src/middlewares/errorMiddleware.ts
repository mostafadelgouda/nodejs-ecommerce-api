
import { Request, Response, NextFunction } from "express";
import ApiError from "../utils/apiError";

interface AppError extends Error {
  statusCode?: number;
  status?: string;
}

const sendErrorForDev = (err: ApiError, res: Response) =>
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });

const sendErrorForProd = (err: ApiError, res: Response) =>
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });

const globalErrorHandling = (err: ApiError, req: Request, res: Response, next: NextFunction) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorForDev(err, res);
  } else {
    sendErrorForProd(err, res);
  }
};

export default globalErrorHandling;