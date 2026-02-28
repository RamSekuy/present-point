import authService from "@/service/auth.service";
import { NextFunction, Request, Response } from "express";
class UserMiddleware {
  async aauthValidate(req: Request, _res: Response, next: NextFunction) {
    try {
      const userData = await authService.validateAccessToken(req);
      req.user = userData;
      next();
    } catch (error) {
      next(error);
    }
  }

  async locationOwner(req: Request, _res: Response, next: NextFunction) {}
}

const userMiddleware = new UserMiddleware();
export default userMiddleware;
