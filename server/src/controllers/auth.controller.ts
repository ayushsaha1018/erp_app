import { AUTH_COOKIE } from "@config/keys";
import Org from "@models/Org";
import { Request, Response } from "express";

export const registerOrg = async (req: Request, res: Response) => {
  const org = new Org(req.body);
  await org.save();

  const token = org.issueToken();
  res.cookie(AUTH_COOKIE.name, token, AUTH_COOKIE.options);
  res.status(201).json({
    success: true,
    message: "Org created successfully",
    data: { id: org._id }
  });
};

export const loginOrg = async (req: Request, res: Response) => {
  const { name, password } = req.body;
  const org = await Org.findOne({ name });

  if (!org) {
    return res.status(404).json({
      success: false,
      message: "Org not found",
      data: { name }
    });
  }

  const isMatch = await org.verifyPassword(password);

  if (!isMatch) {
    return res.status(401).json({
      success: false,
      message: "Invalid credentials",
      data: {
        error: "Invalid credentials"
      }
    });
  }

  res.cookie(AUTH_COOKIE.name, org.issueToken(), AUTH_COOKIE.options);
  res.status(200).json({
    success: true,
    message: "Org logged in successfully",
    data: {
      id: org._id,
      name: org.name,
      description: org.description,
      email: org.email,
      website: org.website
    }
  });
};
