import { NextFunction, Request, Response } from "express";

type RouteHandler = (
  req: Request,
  res: Response,
  next?: NextFunction
) => Promise<void>;

export const catchAsync = (fn: RouteHandler) =>
  function (req: Request, res: Response, next: NextFunction) {
    fn(req, res, next).catch(next);
  };
