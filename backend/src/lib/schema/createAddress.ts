import z from "zod";

export const createAddressSchema = z.object({
  name: z.string(),
  detail: z.string(),
  longitude: z.number(),
  latitude: z.number(),
  radius: z.number(),
});
