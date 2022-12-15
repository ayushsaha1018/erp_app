import { ExpressError } from "@utils/ExpressError";
import { NextFunction, Request, Response } from "express";

export const NotFoundHandler = () => {
  throw new ExpressError("Route not found", 404);
};

export const ErrorHandler = (
  err: ExpressError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (!err.statusCode) {
    err.statusCode = 500;
  }

  const { statusCode, message, error } = err;

  res.status(statusCode).json({
    success: false,
    message,
    data: {
      error
    }
  });
};
