import z from "zod";
import { imageSchema } from "./image.schema";

const userUpdateSchema = z.object({
  name: z.string().trim().min(3).optional(),
  email: z.email().trim().optional(),
  image: z.optional(imageSchema),
});

export default userUpdateSchema;
