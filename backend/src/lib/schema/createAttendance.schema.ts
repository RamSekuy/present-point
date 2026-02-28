import z from "zod";

export const createAttendanceSchema = z.object({
  locationId: z.string(),
  type: z.enum(["Enter", "Out"]),
});
