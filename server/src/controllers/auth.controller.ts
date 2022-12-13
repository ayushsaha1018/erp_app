import { AUTH_COOKIE } from "@config/keys";
import Org from "@models/Org";
import { CustomError } from "@utils/CustomError";
import { ResponseWriter } from "@utils/ResponseWriter";
import { Request, Response } from "express";

export const registerOrg = async (req: Request, res: Response) => {
  const org = new Org(req.body);
  await org.save();

  const token = org.issueToken();
  res.cookie(AUTH_COOKIE.name, token, AUTH_COOKIE.options);
  ResponseWriter(res, 201, { id: org._id }, "Org created successfully");
};

export const loginOrg = async (req: Request, res: Response) => {
  const { name, password } = req.body;
  const org = await Org.findOne({ name });

  if (!org) throw new CustomError("Org not found", 404);

  const isMatch = await org.verifyPassword(password);

  if (!isMatch) throw new CustomError("Invalid credentials", 401);
  res.cookie(AUTH_COOKIE.name, org.issueToken(), AUTH_COOKIE.options);

  ResponseWriter(res, 200, org, "Org logged in successfully");
};
