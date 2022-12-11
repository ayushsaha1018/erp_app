import { AUTH_COOKIE } from "@config/keys";
import Org from "@models/Org";
import { Request, Response } from "express";

export const registerOrg = async (req: Request, res: Response) => {
  const org = new Org(req.body);
  await org.save();
  res.status(201).json(org);
};

export const loginOrg = async (req: Request, res: Response) => {
  const { name, password } = req.body;
  const org = await Org.findOne({ name });

  if (!org) {
    return res.status(404).json({ message: "Org not found" });
  }

  const isMatch = await org.verifyPassword(password);

  if (!isMatch) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  res.cookie(AUTH_COOKIE.name, org.issueToken(), AUTH_COOKIE.options);
  res.status(200).json(org);
};
