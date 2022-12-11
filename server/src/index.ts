import express from "express";
import { PORT } from "@config/keys";
import connectDB from "@config/db";
import authRouter from "@routes/auth.routes";

const app = express();
connectDB();

app.use(express.json());
app.use("/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
