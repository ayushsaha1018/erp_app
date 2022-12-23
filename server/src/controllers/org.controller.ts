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
  let i = 0;
  let error = false;
  fs.createReadStream(file.path)
    .pipe(
      csvParser({
        headers: ["firstName", "lastName", "email", "password", "role"],
        strict: true
      })
    )
    .on("data", (row: AccountRow) => {
      try {
        if (i === 0) {
          i++;
          return;
        }

        data.push(RegisterUserSchema.parse(row));
      } catch (e) {
        error = true;
        next(new ExpressError("Invalid data file", 400));
      }
    })
    .on("end", async () => {
      if (error) {
        return;
      }

      try {
        const txns: Promise<Document>[] = [];
        for (let i = 0; i < data.length; i++) {
          const { firstName, lastName, email, password, role } = data[i];
          const user = new User({
            firstName,
            lastName,
            email,
            password,
            role,
            org: req.org!._id
          });

          // If email already occured before, skip
          const skipOrNot = data
            .slice(0, i)
            .findIndex((row) => row.email === email);

          if (skipOrNot === -1) {
            txns.push(user.save());
          }
        }

        await Promise.all(txns);
        ResponseWriter(res, 200, {}, "Successfully created user accounts!");
      } catch (err) {
        error = true;
        next(new ExpressError("Invalid data file", 400));
      } finally {
        // Delete the file after processing
        fs.unlinkSync(file.path);
      }
    })
    .on("error", () => {
      fs.unlinkSync(file.path);
      if (error) return;
      error = true;
      next(new ExpressError("Invalid data file", 400));
    });
};
