type OrgDoc = import("@models/Org").OrgDoc;
type UserDoc = import("@models/User").UserDoc;
type MongoID = import("mongoose").ObjectId;

type AccountRow = {
  firstName: string;
  lastName?: string | null;
  email: string;
  password: string;
  role: "admin" | "teacher" | "student";
};

interface IOrganization {
  _id: MongoID;
  name: string;
  description: string;
  website: string;
  email: string;
  password: string;
  salt?: string;
  verifyPassword(password: string): Promise<boolean>;
  issueToken(): string;
}

interface IUser {
  _id: MongoID;
  org: MongoID;
  firstName: string;
  role: "admin" | "teacher" | "student";
  lastName?: string;
  email: string;
  password: string;
  salt?: string;
  verifyPassword(password: string): Promise<boolean>;
  issueToken(): string;
}

declare namespace Express {
  interface Request {
    org?: OrgDoc;
    user?: UserDoc;
  }
}
