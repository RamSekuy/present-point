import db from "@/lib/prisma";
import { Request } from "express";

class ImageService {
  async render(req: Request) {
    const image = await db.image.findUnique({
      where: { id: req.params.imageId },
      select: { image: true },
    });
    return image?.image;
  }
}

export default new ImageService();
