import z from "zod";

export const imageFormatSchema = z.enum([
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
]);
