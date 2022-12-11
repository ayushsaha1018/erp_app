import express from "express";
import cookieParser from "cookie-parser";

import { PORT } from "@config/keys";
import connectDB from "@config/db";
import authRouter from "@routes/auth.routes";

const app = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
