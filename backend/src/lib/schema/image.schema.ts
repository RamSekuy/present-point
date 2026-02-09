import z from "zod";

export const ImageSchema = z
  .instanceof(File)
  .refine(
    (file) => ["image/png", "image/jpeg", "image/jpg"].includes(file.type),
    { message: "Invalid image file type" },
  );

export const multerImageSchema = (maxSize: number) =>
  z.object({
    mimetype: z.enum(["image/png", "image/jpeg", "image/jpg"]),
    size: z
      .number()
      .max(maxSize, `File size harus kurang dari ${maxSize / 1024 / 1024}MB`),
  });
