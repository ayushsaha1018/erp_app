import { ExpressError } from "@utils/ExpressError";
import { NextFunction, Request, Response } from "express";

export const isOrgAuth = (req: Request, _res: Response, next: NextFunction) => {
  if (!req.org) {
    throw new ExpressError("Not authenticated", 401);
  }

  next();
};
