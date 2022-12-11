import { loginOrg, registerOrg } from "@controllers/auth.controller";
import express from "express";

const authRouter = express.Router();

authRouter.post("/org/register", registerOrg);
authRouter.post("/org/login", loginOrg);

export default authRouter;
