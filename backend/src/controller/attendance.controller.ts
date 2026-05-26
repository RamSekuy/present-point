/** @format */
import { NextFunction, Request, Response } from "express";
import attendanceService from "@/service/attendance.service";
import { sendResponse } from "@/utils/sendResponse";

class AttendanceController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      console.log("controller handling");
      const data = await attendanceService.create(req);
      sendResponse(res, "user address allow added", data);
    } catch (error) {
      next(error);
    }
  }

  async getMine(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await attendanceService.getMine(req);
      sendResponse(res, "Success Get Attendance", data);
    } catch (error) {
      next(error);
    }

    // async delete(req: Request, res: Response, next: NextFunction) {
    //   try {
    //     const data = await attendanceService.delete(req);
    //     sendResponse(res, "user address allow deleted", data);
    //     res.send();
    //   } catch (error) {
    //     next(error);
    //   }
    // }
  }
}

export default new AttendanceController();
