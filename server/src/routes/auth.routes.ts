import {
  loginOrg,
  registerOrg,
  checkOrgAuth,
  logout,
  loginUser,
  checkUserAuth
} from "@controllers/auth.controller";
import { isOrgAuth } from "@middlewares/isOrgAuth";
import { isUserAuth } from "@middlewares/isUserAuth";
import { validate } from "@middlewares/validate";
import { catchAsync } from "@utils/catchAsync";
import express from "express";
import { OrgLoginSchema, OrgRegisterSchema } from "validators/org";
import { LoginUserSchema } from "validators/user";

const authRouter = express.Router();

// Org routes
authRouter.post(
  "/org/register",
  validate(OrgRegisterSchema),
  catchAsync(registerOrg)
);
authRouter.post("/org/login", validate(OrgLoginSchema), catchAsync(loginOrg));
authRouter.get("/org", isOrgAuth, catchAsync(checkOrgAuth));

// User
authRouter.post(
  "/user/login",
  validate(LoginUserSchema),
  catchAsync(loginUser)
);
authRouter.get("/user", isUserAuth, catchAsync(checkUserAuth));

// Logout
authRouter.get("/logout", catchAsync(logout));

export default authRouter;
