import z from "zod";

export const createAttendanceSchema = z.object({
  addressId: z.string(),
  type: z.enum(["Enter", "Out"]).default("Enter"),
  longitude: z.coerce.number(),
  latitude: z.coerce.number(),
});
