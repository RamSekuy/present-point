import authService from "@/service/auth.service";
import { NextFunction, Request, Response } from "express";
import { Err403 } from "@/class/customError";
class UserMiddleware {
  async authValidate(req: Request, _res: Response, next: NextFunction) {
    try {
      const userData = await authService.validateAccessToken(req);
      req.user = userData;
      next();
    } catch (error) {
      next(error);
    }
  }

  async AccountOwner(req: Request, _res: Response, next: NextFunction) {
    try {
      const userData = await authService.validateAccessToken(req);
      const isOwner = req.params.userId === userData.id;
      if (!isOwner) throw new Err403("Not Allow to Access");
      req.user = userData;
      next();
    } catch (error) {
      next(error);
    }
  }

  async isAdmin(req: Request, _res: Response, next: NextFunction) {
    try {
      const userData = await authService.validateAccessToken(req);
      if (!userData.isAdmin) throw new Err403("Not Admin");
      req.user = userData;
      next();
    } catch (error) {
      next(error);
    }
  }
}

const userMiddleware = new UserMiddleware();
export default userMiddleware;
