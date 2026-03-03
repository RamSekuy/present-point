import z from "zod";

export const imageSchema = z
  .instanceof(File)
  .refine((file) => file.size <= 1 * 1024 * 1024, "Max 1MB")
  .refine(
    (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
    "Format harus JPG/PNG/WEBP",
  );
