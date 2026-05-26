import z from "zod";

export const attendanceCreateSchema = z.object({
  addressId: z.string().uuid(),
  userId: z.string().uuid(),
});
