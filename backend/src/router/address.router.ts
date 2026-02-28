import userMiddleware from "@/middleware/auth.middleware";
import { EntityRouter } from "./entity.router";
import addressController from "@/controller/address.controller";

class AuthRouter extends EntityRouter {
  private c = addressController;
  constructor() {
    super();
    this.initializedRoutes();
  }
  private initializedRoutes() {
    this.router.use("/*", userMiddleware.aauthValidate);
    this.router.get("/", this.c.getAll).bind(this.c);
    this.router.get("/:id", this.c.getById).bind(this.c);
    this.router.post("/", this.c.create).bind(this.c);
    this.router.delete("/:id", this.c.delete).bind(this.c);
  }
}
export default new AuthRouter();
