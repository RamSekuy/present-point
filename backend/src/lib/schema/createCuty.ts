import z from "zod";

export const createCutySchema = z.object({
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),

});
