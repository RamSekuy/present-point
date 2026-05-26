import z from "zod";

export const updateAddressSchema = z.object({
  name: z.string().optional(),
  detail: z.string().optional(),
  longitude: z.number().optional(),
  latitude: z.number().optional(),
  radius: z.number().optional(),
});
