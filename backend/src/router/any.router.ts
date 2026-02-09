import anyController from "../controller/any.controller";
import { EntityRouter } from "./entity.router";

class anyRouter extends EntityRouter {
  private controller = anyController;
  constructor() {
    super();
    this.initializedRoutes();
  }
  private initializedRoutes() {
    this.router.get("/", this.controller.getAll.bind(this.controller));
  }
}
export default new anyRouter();
