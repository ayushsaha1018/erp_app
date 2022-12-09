import express from "express";

const app = express();

app.get("/", async (req, res) => {
  res.send("Hello World");
});

console.log("Hello");

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} :)`);
});
