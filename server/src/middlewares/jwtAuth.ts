import { NextFunction, Request, Response } from "express";
import Org from "@models/Org";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ADMIN_AUTH_COOKIE, CLIENT_AUTH_COOKIE, JWT } from "@config/keys";
import { catchAsync } from "@utils/catchAsync";
import User from "@models/User";

const verifyOrgToken = async (token: string) => {
  try {
    const decoded = jwt.verify(token, JWT.secret) as JwtPayload;
    const org = await Org.findById(decoded.id);
    return org;
  } catch (error) {
    return null;
  }
};

const verifyUserToken = async (token: string) => {
  try {
    const decoded = jwt.verify(token, JWT.secret) as JwtPayload;
    const user = User.findById(decoded.id);
    return user;
  } catch (error) {
    return null;
  }
};

export const adminJWTCookieParser = catchAsync(
  async (req: Request, _res: Response, next: NextFunction) => {
    if (req.org) {
      return next();
    }

    const token = req.cookies[ADMIN_AUTH_COOKIE.name];
    if (token) {
      const org = await verifyOrgToken(token);
      if (org) {
        req.org = org;
      }
    }

    next();
  }
);

export const userJWTCookieParser = catchAsync(
  async (req: Request, _res: Response, next: NextFunction) => {
    if (req.user) {
      return next();
    }

    const token = req.cookies[CLIENT_AUTH_COOKIE.name];
    if (token) {
      const user = await verifyUserToken(token);
      if (user) {
        req.user = user;
      }
    }

    next();
  }
);
