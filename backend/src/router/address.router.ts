import userMiddleware from "@/middleware/auth.middleware";
import { EntityRouter } from "./entity.router";
import addressController from "@/controller/address.controller";

class AddressRouter extends EntityRouter {
  private c = addressController;
  constructor() {
    super();
    this.initializedRoutes();
  }
  private initializedRoutes() {
    this.router.use("/", userMiddleware.authValidate);
    this.router.get("/", this.c.getAll);
    this.router.get("/:id", this.c.getById);
    this.router.post("/c", this.c.create);
    this.router.patch("/:id", this.c.update);
    this.router.delete("/:id", this.c.delete);
  }
}
export default new AddressRouter();
