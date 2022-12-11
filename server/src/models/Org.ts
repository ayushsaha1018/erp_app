import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { IOrganization } from "types";

const { Schema } = mongoose;

const orgSchema = new Schema<IOrganization>({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  website: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  salt: { type: String }
});

orgSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    this.salt = salt;
    return next();
  }

  next();
});

orgSchema.methods.verifyPassword = async function (password: string) {
  try {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  } catch (err) {
    return false;
  }
};

export default mongoose.model("Org", orgSchema);
