export type AccountRow = {
  email: string;
  password: string;
};

export interface IOrganization {
  name: string;
  description: string;
  website: string;
  email: string;
  password: string;
  salt?: string;
  verifyPassword(password: string): Promise<boolean>;
}
