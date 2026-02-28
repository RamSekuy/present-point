import z from "zod";

export const querySchema = z
  .object({
    skip: z.coerce.number().int("Have to Int").min(0).optional(),
    take: z.coerce.number().int("Have to Int").min(1).default(20),
  })
  .catchall(z.string({ message: "query harus string" }));
