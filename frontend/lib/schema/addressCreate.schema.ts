import z from "zod";

const addressCreateSchema = z.object({
  name: z.string(),
  detail: z.string(),
  longitude: z.number(),
  latitude: z.number(),
  radius: z.number(),
});

export default addressCreateSchema;
