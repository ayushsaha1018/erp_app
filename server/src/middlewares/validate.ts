import { NextFunction, Request, Response } from "express";
import z, { ZodError } from "zod";

export const validate =
  <T>(schema: z.ZodType<T>) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (err) {
      const error = err as ZodError<T>;
      res.status(400).json({
        success: false,
        message: "Invalid data",
        data: {
          errors: error.issues
        }
      });
    }
  };
