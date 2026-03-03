import z from "zod";
import { imageSchema } from "./image.schema";

const registerSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  name: z.string().trim().min(3),
  image: imageSchema,
});

export default registerSchema;
