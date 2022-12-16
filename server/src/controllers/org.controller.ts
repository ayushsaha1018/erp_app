import { ExpressError } from "@utils/ExpressError";
import { NextFunction, Request, Response } from "express";
import fs from "fs";

import csvParser from "csv-parser";

import User from "@models/User";
import { Document } from "mongoose";
import { ResponseWriter } from "@utils/ResponseWriter";
import { RegisterUserSchema } from "validators/user";

export const uploadData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.file) {
    throw new ExpressError("File not found", 404);
  }

  const { file } = req;

  const data: AccountRow[] = [];

  fs.createReadStream(file.path)
    .pipe(
      csvParser({
        headers: ["firstName", "lastName", "email", "password"],
        strict: true
      })
    )
    .on("data", (row: AccountRow) => {
      try {
        data.push(RegisterUserSchema.parse(row));
      } catch (e) {
        next(new ExpressError("Invalid data file", 400));
      }
    })
    .on("end", async () => {
      try {
        const txns: Promise<Document>[] = [];
        for (let i = 1; i < data.length; i++) {
          const { firstName, lastName, email, password } = data[i];
          const user = new User({
            firstName,
            lastName,
            email,
            password,
            org: req.org!._id
          });

          txns.push(user.save());
        }

        await Promise.all(txns);
        ResponseWriter(res, 200, {}, "Successfully created user accounts!");
      } catch (error) {
        next(new ExpressError("Invalid data file", 400));
      } finally {
        // Delete the file after processing
        fs.unlinkSync(file.path);
      }
    })
    .on("error", () => {
      fs.unlinkSync(file.path);
      next(new ExpressError("Invalid data file", 400));
    });
};
