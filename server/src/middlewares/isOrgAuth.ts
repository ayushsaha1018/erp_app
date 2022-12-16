import { catchAsync } from "@utils/catchAsync";
import { ExpressError } from "@utils/ExpressError";
import { NextFunction, Request, Response } from "express";

export const isOrgAuth = catchAsync(
  async (req: Request, _res: Response, next: NextFunction) => {
    if (!req.org) {
      throw new ExpressError("Not authenticated", 401);
    }

    next();
  }
);
