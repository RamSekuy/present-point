import z from "zod";

export const userUpdateSchma = z.object({
  name: z.string().trim().min(3).optional(),
  email: z.email().trim().optional(),
  password: z.string().min(8).optional(),
});
