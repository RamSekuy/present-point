/** @format */
import { NextFunction, Request, Response } from "express";
import userAddressAllowService from "@/service/userAddressAllow.service";
import { sendResponse } from "@/utils/sendResponse";

export class UserAddressAllowController {
  private service = userAddressAllowService;

  async add(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.service.add(req);
      sendResponse(res, "user address allow added", data);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.service.delete(req);
      sendResponse(res, "user address allow deleted", data);
      res.send();
    } catch (error) {
      next(error);
    }
  }
}

export default new UserAddressAllowController();
