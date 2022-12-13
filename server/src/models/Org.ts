import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { IOrganization } from "types";
import { JWT } from "@config/keys";

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

orgSchema.methods.issueToken = function () {
  const payload = {
    id: this._id,
    name: this.namel,
    email: this.email
  };

  const token = jwt.sign(payload, JWT.secret, {
    expiresIn: JWT.expiresIn
  });

  return token;
};

export default mongoose.model("Org", orgSchema);
