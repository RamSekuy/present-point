/** @format */
import { NextFunction, Request, Response } from "express";
import { sendResponse } from "@/utils/sendResponse";
import service from "@/service/userAddressAllow.service";

class UserAddressAllowController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await service.create(req);
      sendResponse(res, "Success Attend", data);
    } catch (error) {
      next(error);
    }
  }
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await service.delete(req);
      sendResponse(res, "Success Attend", data);
    } catch (error) {
      next(error);
    }
  }
}

export default new UserAddressAllowController();
