import c from "@/controller/user.controller";
import { EntityRouter } from "./entity.router";

export class UserRouter extends EntityRouter {
  constructor() {
    super();
    this.initializedRoutes();
  }
  private initializedRoutes(): void {
    this.router.get("/", c.getAll);
  }
}

export default new UserRouter();
