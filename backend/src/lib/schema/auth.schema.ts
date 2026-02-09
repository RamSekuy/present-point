import z from "zod";

const registerSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(8),
  name: z.string().trim().min(1),
});

const loginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(8),
});

export { registerSchema, loginSchema };
