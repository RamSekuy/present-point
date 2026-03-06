import multer, { FileFilterCallback } from "multer";
import { Request } from "express";
import z from "zod";
import { imageFormatSchema } from "./schema/image.schema";

const mB = 1072864;
export const maxSize = 1 * mB;

const multerConfig = (requireImg = true): multer.Options => ({
  limits: {
    fileSize: maxSize,
  },
  fileFilter: (
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback,
  ) => {
    try {
      requireImg ? imageFormatSchema.parse(file.mimetype) : null;
      return cb(null, true);
    } catch (error) {
      console.log("Multer ERROR");
      if (error instanceof z.ZodError) {
        const message = error.message || "File validation failed";
        return cb(new Error(message));
      }
      return cb(new Error("File validation error"));
    }
  },
});

export function blobUploader() {
  console.log("multering");
  return multer({ ...multerConfig() });
}

export function blobOptional() {
  return multer({ ...multerConfig(false) });
}
