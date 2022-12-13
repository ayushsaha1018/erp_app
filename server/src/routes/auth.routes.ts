import { loginOrg, registerOrg } from "@controllers/auth.controller";
import { catchAsync } from "@utils/catchAsync";
import express from "express";

const authRouter = express.Router();

authRouter.post("/org/register", catchAsync(registerOrg));
authRouter.post("/org/login", catchAsync(loginOrg));

export default authRouter;
