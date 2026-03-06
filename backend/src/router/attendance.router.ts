import c from "@/controller/attendance.controller";
import { EntityRouter } from "./entity.router";
import userMiddleware from "@/middleware/auth.middleware";
import { blobUploader } from "@/lib/multer";

export class attendancARouter extends EntityRouter {
  constructor() {
    super();
    this.initializedRoutes();
  }
  private initializedRoutes(): void {
    this.router.post(
      "/:addressId/:userId",
      userMiddleware.AccountOwner,
      blobUploader().single("image"),
      c.create,
    );
  }
}

export default new attendancARouter();
