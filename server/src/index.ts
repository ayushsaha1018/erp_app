import express from "express";

import { PORT } from "@config/keys";
import connectDB from "@config/db";
import authRouter from "@routes/auth.routes";
import { ErrorHandler, NotFoundHandler } from "@controllers/error.controller";
import { setupMiddlewares } from "@middlewares/express-setup";
import orgRouter from "@routes/org.routes";

const app = express();

// Connect to database
connectDB();

// Setup Middlewares
setupMiddlewares(app);

// Define routes
app.use("/auth", authRouter);
app.use("/org", orgRouter);

// 404
app.use(NotFoundHandler);

// Setup error handling
app.use(ErrorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
