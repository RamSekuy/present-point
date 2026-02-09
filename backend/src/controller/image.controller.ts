import imageService from "@/service/image.service";
import { NextFunction, Request, Response } from "express";

export class ImageController {
  async render(req: Request, res: Response, next: NextFunction) {
    try {
      const blob = await imageService.render(req);
      res.status(200).set("Content-type", "image/webp").send(blob);
    } catch (error) {
      next(error);
    }
  }
}

export default new ImageController();
