import express, { NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";

import { PORT } from "@config/keys";
import connectDB from "@config/db";
import authRouter from "@routes/auth.routes";
import { CustomError } from "@utils/CustomError";

const app = express();
connectDB();

// Setup Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Define routes
app.use("/auth", authRouter);

// Setup error handling
app.use(
  (err: CustomError, _req: Request, res: Response, _next: NextFunction) => {
    if (!err.statusCode) {
      err.statusCode = 500;
    }

    const { statusCode, message, error } = err;

    res.status(statusCode).json({
      success: false,
      message,
      data: {
        error
      }
    });
  }
);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
