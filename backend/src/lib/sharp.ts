import { Err400 } from "@/class/customError";
import sharp from "sharp";

const mimeToSharp: Record<string, "jpeg" | "png" | "webp"> = {
  "image/jpeg": "jpeg",
  "image/jpg": "jpeg",
  "image/png": "png",
  "image/webp": "webp",
};

export async function imageBuffer(file?: Express.Multer.File) {
  if (!file) throw new Err400("Invalid Image Input");

  const format = mimeToSharp[file.mimetype];
  if (!format) throw new Err400("Unsupported image type");

  const buffer = (await sharp(file.buffer)
    .toFormat(format)
    .toBuffer()) as Uint8Array<ArrayBuffer>;

  return {
    mimetype: format,
    buffer,
  };
}
