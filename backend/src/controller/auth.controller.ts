import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../utils/sendResponse";
import authService from "@/service/auth.service";

export class AuthController {
  private service = authService;
  private expire = (minutes = 15) => new Date(Date.now() + minutes * 60 * 1000);

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      console.log("login in process");
      const token = await this.service.login(req);
      const { accessToken, refreshToken } = token;
      res.cookie("rauth", refreshToken, { expires: this.expire(60 * 24) });
      res.cookie("aauth", accessToken, { expires: this.expire() });
      console.log("login Success");
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
      const { accessToken, refreshToken } = token;
      res.cookie("rauth", refreshToken, { expires: this.expire(60 * 24) });
      res.cookie("aauth", accessToken, { expires: this.expire() });
      sendResponse(res, "access token refreshed", token);
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();
