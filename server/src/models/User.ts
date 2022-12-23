import mongoose, { Document } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { mongoTransform } from "@utils/mongoTransform";
import { JWT } from "@config/keys";

const { Schema } = mongoose;

const userSchema = new Schema<IUser>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String },
    email: { type: String, required: true, unique: true },
    org: {
      type: Schema.Types.ObjectId,
      ref: "Org",
      required: true
    },
    role: {
      type: String,
      enum: ["admin", "student", "teacher"],
      default: "student",
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

userSchema.methods.verifyPassword = async function (password: string) {
  try {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  } catch (err) {
    return false;
  }
};

userSchema.methods.issueToken = function () {
  const payload = {
    id: this._id,
    firstName: this.firstName,
    lastName: this.lastName,
    email: this.email,
    org: this.org,
    role: this.role
  };

  const token = jwt.sign(payload, JWT.secret, {
    expiresIn: JWT.expiresIn
  });

  return token;
};

export default mongoose.model("User", userSchema);

export type UserDoc = Document & IUser;
