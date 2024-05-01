import { z } from "zod";

export const signinSchema = z.object({
  email: z.string().email({ message: "Invalid Email" }),
  password: z
    .string()
    .min(6, { message: "Password must be atleast 6 characters" }),
});
