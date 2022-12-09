import express from "express";
import { sayHello } from "@utils/sayHello";

const app = express();

app.get("/", async (req, res) => {
  res.send("Hello World");
});

sayHello("World");

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} :)`);
});
