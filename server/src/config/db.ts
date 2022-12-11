import mongoose from "mongoose";
import { DB_URI } from "./keys";

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(DB_URI);
    console.log("MongoDB Connected");
  } catch (err) {
    console.error((err as Error).message);
    process.exit(1);
  }
};

export default connectDB;
