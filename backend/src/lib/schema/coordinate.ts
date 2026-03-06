import z from "zod";

export const coordinateSchema = z.object({
  longitude: z.number(),
  latitude: z.number(),
});
