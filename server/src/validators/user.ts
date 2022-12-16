import z from "zod";

export const RegisterUserSchema = z.object({
  firstName: z.string().min(3).max(30),
  lastName: z.string().nullish(),
  email: z.string().email(),
  password: z.string().min(3)
});
