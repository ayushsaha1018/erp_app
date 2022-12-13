import z from "zod";

export const OrgRegisterSchema = z.object({
  name: z.string().min(3).max(50),
  description: z.string().min(3).max(50),
  website: z.string(),
  email: z.string().email(),
  password: z.string().min(6).max(50)
});

export const OrgLoginSchema = z.object({
  name: z.string().min(3).max(50),
  password: z.string().min(6).max(50)
});
