import authController from "@/controller/auth.controller";
import { EntityRouter } from "./entity.router";
import { blobUploader, blobOptional } from "@/lib/multer";
import userMiddleware from "@/middleware/auth.middleware";

class AuthRouter extends EntityRouter {
  private c = authController;
  constructor() {
    super();
    this.initializedRoutes();
  }
  private initializedRoutes() {
    this.router.get("/me", userMiddleware.authValidate, this.c.me.bind(this.c));

    this.router.post("/v0", this.c.refresh.bind(this.c));
    this.router.post(
      "/v1",
      blobUploader().single("image"),
      (req, res, next) => {
        console.log(req.body);
        next();
      },
      this.c.register.bind(this.c),
    );
    this.router.post("/v1/:token", this.c.verifyEmail.bind(this.c));
    this.router.post("/v2", this.c.login.bind(this.c));

    this.router.patch(
      "/:userId",
      userMiddleware.AccountOwner,
      blobOptional().single("image"),
      this.c.update.bind(this.c),
    );
  }
}
export default new AuthRouter();
