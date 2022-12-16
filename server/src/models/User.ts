import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { mongoTransform } from "@utils/mongoTransform";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String },
    email: { type: String, required: true, unique: true },
    org: {
      type: Schema.Types.ObjectId,
      ref: "Org",
      required: true
    },
    password: { type: String, required: true },
    salt: { type: String }
  },
  {
    timestamps: true,
    toJSON: {
      transform: mongoTransform
    }
  }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    this.salt = salt;
    return next();
  }

  next();
});

export default mongoose.model("User", userSchema);
