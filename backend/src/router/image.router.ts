import imageController from "@/controller/image.controller";
import { EntityRouter } from "./entity.router";

export class ImageRouter extends EntityRouter {
  constructor() {
    super();
    this.initializedRoutes();
  }
  private initializedRoutes(): void {
    this.router.get("/:name", imageController.render);
  }
}

export default new ImageRouter();
