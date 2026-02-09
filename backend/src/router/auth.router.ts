import authController from "@/controller/auth.controller";
import { EntityRouter } from "./entity.router";

class AuthRouter extends EntityRouter {
  private c = authController;
  constructor() {
    super();
    this.initializedRoutes();
  }
  private initializedRoutes() {
    this.router.get("/*", (r, r2) => r2.send("auth route"));
    this.router.post("/v0", this.c.refresh.bind(this.c));
    this.router.post("/v1", this.c.register.bind(this.c));
    this.router.post("/v2", this.c.login.bind(this.c));
  }
}
export default new AuthRouter();
