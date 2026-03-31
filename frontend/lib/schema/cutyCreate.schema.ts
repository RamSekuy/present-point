import z from "zod";

const cutyCreateSchema = z.object({
  userId: z.string(),
  startDate: z.date(),
  endDate: z.date(),
  description: z.string().optional(),
});

export default cutyCreateSchema;
