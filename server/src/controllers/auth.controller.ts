import { ADMIN_AUTH_COOKIE, CLIENT_AUTH_COOKIE } from "@config/keys";
import Org from "@models/Org";
import User from "@models/User";
import { ExpressError } from "@utils/ExpressError";
import { ResponseWriter } from "@utils/ResponseWriter";
import { Request, Response } from "express";

export const registerOrg = async (req: Request, res: Response) => {
  const org = new Org(req.body);
  await org.save();

  const token = org.issueToken();
  res.cookie(ADMIN_AUTH_COOKIE.name, token, ADMIN_AUTH_COOKIE.options);
  ResponseWriter(res, 201, { id: org._id }, "Org created successfully");
};

export const loginOrg = async (req: Request, res: Response) => {
  const { name, password } = req.body;
  const org = await Org.findOne({ name });

  if (!org) throw new ExpressError("Org not found", 404);

  const isMatch = await org.verifyPassword(password);

  if (!isMatch) throw new ExpressError("Invalid credentials", 401);
  res.cookie(
    ADMIN_AUTH_COOKIE.name,
    org.issueToken(),
    ADMIN_AUTH_COOKIE.options
  );

  ResponseWriter(res, 200, org, "Org logged in successfully");
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    email
  });

  if (!user) throw new ExpressError("User not found", 404);

  const isMatch = await user.verifyPassword(password);

  if (!isMatch) throw new ExpressError("Invalid credentials", 401);

  res.cookie(
    CLIENT_AUTH_COOKIE.name,
    user.issueToken(),
    CLIENT_AUTH_COOKIE.options
  );

  ResponseWriter(res, 200, user, "User logged in successfully");
};

export const checkOrgAuth = async (req: Request, res: Response) => {
  const org = req.org || {};

  ResponseWriter(res, 200, org, "You are logged in!");
};

export const checkUserAuth = async (req: Request, res: Response) => {
  const user = req.user || {};

  ResponseWriter(res, 200, user, "You are logged in!");
};

export const logout = async (_req: Request, res: Response) => {
  res.clearCookie(ADMIN_AUTH_COOKIE.name);
  res.clearCookie(CLIENT_AUTH_COOKIE.name);
  ResponseWriter(res, 200, {}, "Logged out successfully");
};
