import c from "@/controller/cuty.controller";
import { EntityRouter } from "./entity.router";
import userMiddleware from "@/middleware/auth.middleware";

export class attendancARouter extends EntityRouter {
  constructor() {
    super();
    this.initializedRoutes();
  }
  private initializedRoutes(): void {
    this.router.get("/", userMiddleware.isAdmin, c.getAll);
    this.router.get("/:userId", userMiddleware.AccountOwner, c.getOwn);
    this.router.post("/:userId", userMiddleware.AccountOwner, c.create);
    this.router.patch("/:cutyId", userMiddleware.isAdmin, c.confirm);
  }
}

export default new attendancARouter();
