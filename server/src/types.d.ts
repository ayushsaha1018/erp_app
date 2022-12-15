type OrgDoc = import("@models/Org").OrgDoc;

type AccountRow = {
  email: string;
  password: string;
};

interface IOrganization {
  _id: import("mongoose").ObjectId;
  name: string;
  description: string;
  website: string;
  email: string;
  password: string;
  salt?: string;
  verifyPassword(password: string): Promise<boolean>;
  issueToken(): string;
}

declare namespace Express {
  interface Request {
    org?: OrgDoc;
  }
}
