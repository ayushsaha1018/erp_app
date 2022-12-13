import { Response } from "express";

export const ResponseWriter = (
  res: Response,
  status: number,
  data: object | string,
  message?: string
) => {
  if (typeof data === "string") {
    res.status(status).json({
      success: true,
      message: data
    });
  } else {
    res.status(status).json({
      success: true,
      message,
      data
    });
  }
};
