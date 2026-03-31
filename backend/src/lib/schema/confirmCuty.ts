import z from "zod";

export const confirmCutySchema = z.object({
  cutyId: z.string(),
});
