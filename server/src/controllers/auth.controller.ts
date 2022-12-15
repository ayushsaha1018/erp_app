import { ADMIN_AUTH_COOKIE } from "@config/keys";
import Org from "@models/Org";
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

export const checkOrgAuth = async (req: Request, res: Response) => {
  const org = req.org || {};

  ResponseWriter(res, 200, org, "You are logged in!");
};
