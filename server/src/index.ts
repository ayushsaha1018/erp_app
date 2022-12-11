import express from "express";
import { PORT } from "@config/keys";
import connectDB from "@config/db";

const app = express();
connectDB();

app.get("/", async (_req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} :)`);
});
