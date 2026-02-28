import db from "@/lib/prisma";
import { Request } from "express";
import { Err404 } from "@/class/customError";
import sharp from "sharp";

class ImageService {
  async render(req: Request) {
    const file = await db.image.findUnique({
      where: { id: req.params.imageId },
      select: { image: true },
    });
    if (!file) throw new Err404("Image Not Found");
    const img = sharp(file.image).webp().toBuffer();
    return img;
  }
}

export default new ImageService();
