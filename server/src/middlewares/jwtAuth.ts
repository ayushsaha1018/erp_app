import { NextFunction, Request, Response } from "express";
import Org from "@models/Org";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT } from "@config/keys";

const verifyToken = async (token: string) => {
  try {
    const decoded = jwt.verify(token, JWT.secret) as JwtPayload;
    const org = await Org.findById(decoded.id);
    return org;
  } catch (error) {
    return null;
  }
};

export const adminJWTCookieParser = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  if (req.org) {
    return next();
  }

  const token = req.cookies["erp-app-admin-auth"];
  if (token) {
    const org = await verifyToken(token);
    if (org) {
      req.org = org;
    }
  }

  next();
};
