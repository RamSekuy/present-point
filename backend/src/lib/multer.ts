import multer, { FileFilterCallback } from "multer";
import { Request } from "express";
import z from "zod";
import { multerImageSchema } from "./schema/image.schema";

const mB = 1072864;
export const maxSize = 1 * mB;

const multerConfig: multer.Options = {
  fileFilter: (
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback,
  ) => {
    try {
      multerImageSchema(maxSize).parse({
        mimetype: file.mimetype,
        size: file.size,
      });
      return cb(null, true);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const message = error.message || "File validation failed";
        return cb(new Error(message));
      }
      return cb(new Error("File validation error"));
    }
  },
};

export function blobUploader() {
  return multer({ ...multerConfig });
}
