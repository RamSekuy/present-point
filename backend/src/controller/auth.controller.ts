import { CookieOptions, NextFunction, Request, Response } from "express";
import { sendResponse } from "../utils/sendResponse";
import authService from "@/service/auth.service";
import { CORS, DOMAIN } from "@/config/config";

const cookieOption: CookieOptions = {
  secure: true,
  httpOnly: true,
  sameSite: "none",
};

export class AuthController {
  private service = authService;

  async me(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.service.me(req);
      sendResponse(res, "login successful", data);
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const token = await this.service.login(req);
      sendResponse(res, "login successful", token);
    } catch (error) {
      next(error);
    }
  }

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.service.register(req);
      sendResponse(res, "registration successful", data);
    } catch (error) {
      next(error);
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const token = await this.service.refresh(req);
      sendResponse(res, "access token refreshed", token);
    } catch (error) {
      next(error);
    }
  }

  async verifyEmail(req: Request, res: Response, next: NextFunction) {
    try {
      await this.service.verifyEmail(req);
      sendResponse(res, "Success Verify");
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.service.update(req);
      sendResponse(res, "Success Update User Data", data);
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();
