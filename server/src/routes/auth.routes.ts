import {
  loginOrg,
  registerOrg,
  checkOrgAuth
} from "@controllers/auth.controller";
import { isOrgAuth } from "@middlewares/isOrgAuth";
import { validate } from "@middlewares/validate";
import { catchAsync } from "@utils/catchAsync";
import express from "express";
import { OrgLoginSchema, OrgRegisterSchema } from "validators/org";

const authRouter = express.Router();

authRouter.post(
  "/org/register",
  validate(OrgRegisterSchema),
  catchAsync(registerOrg)
);
authRouter.post("/org/login", validate(OrgLoginSchema), catchAsync(loginOrg));
authRouter.get("/org", isOrgAuth, catchAsync(checkOrgAuth));

export default authRouter;
