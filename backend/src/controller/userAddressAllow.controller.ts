/** @format */
import { NextFunction, Request, Response } from "express";
import { sendResponse } from "@/utils/sendResponse";
import attendanceService from "@/service/attendance.service";

class UserAddressAllowController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await attendanceService.create(req);
      sendResponse(res, "Success Attend", data);
    } catch (error) {
      next(error);
    }
  }
}

export default new UserAddressAllowController();
