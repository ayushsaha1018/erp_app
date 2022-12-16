import { uploadData } from "@controllers/org.controller";
import { isOrgAuth } from "@middlewares/isOrgAuth";
import { catchAsync } from "@utils/catchAsync";
import express from "express";
import multer from "multer";

const upload = multer({ dest: "uploads/" });

const orgRouter = express.Router();

orgRouter.post(
  "/uploadData",
  isOrgAuth,
  upload.single("userData"),
  catchAsync(uploadData)
);

export default orgRouter;
