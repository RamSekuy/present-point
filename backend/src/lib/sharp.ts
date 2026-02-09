import sharp from "sharp";

export async function imageBuffer(file?: Express.Multer.File) {
  if (!file) throw new Error("Invalid Image Input");

  const mimetype = file.mimetype.split("/")[1] as "png" | "jpeg";
  const buffer = await sharp(file.buffer)[mimetype]().toBuffer();
  return new Uint8Array(buffer) as Uint8Array<ArrayBuffer>;
}
