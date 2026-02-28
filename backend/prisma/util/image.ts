import fs from "fs/promises";
import sharp from "sharp";

function formatToMime(format?: string) {
  switch (format) {
    case "jpeg":
      return "image/jpeg";
    case "png":
      return "image/png";
    case "webp":
      return "image/webp";
    default:
      return null;
  }
}

export async function createImage(filepath: string) {
  const buffer = await fs.readFile(filepath);

  const meta = await sharp(buffer).metadata();
  const mimetype = formatToMime(meta.format);

  if (!mimetype) {
    throw new Error(`Unsupported image format: ${filepath}`);
  }

  const image = (await sharp(buffer)
    .webp()
    .toBuffer()) as Uint8Array<ArrayBuffer>;

  return image;
}
