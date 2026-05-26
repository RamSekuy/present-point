import c from "@/controller/userAddressAllow.controller";
import { EntityRouter } from "./entity.router";
import userMiddleware from "@/middleware/auth.middleware";

export class UserAddressAllowRouter extends EntityRouter {
  constructor() {
    super();
    this.initializedRoutes();
  }
  private initializedRoutes(): void {
    this.router.post("/:addressId", userMiddleware.isAdmin, c.create);
    this.router.delete("/:addressId/:userId", userMiddleware.isAdmin, c.delete);
  }
}

export default new UserAddressAllowRouter();
