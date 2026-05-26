/** @format */
import { NextFunction, Request, Response } from "express";
import cutyService from "@/service/cuty.service";
import { sendResponse } from "@/utils/sendResponse";

class CutyController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await cutyService.getAll(req);
      sendResponse(res, "Success Get Cuty", data);
    } catch (error) {
      next(error);
    }
  }

  async getOwn(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await cutyService.getOwn(req);
      sendResponse(res, "Success Get Cuty", data);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await cutyService.create(req);
      sendResponse(res, "Success Create Cuty Request", data);
    } catch (error) {
      next(error);
    }
  }

  async confirm(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await cutyService.confirm(req);
      sendResponse(res, "Success Confirm Cuty", data);
    } catch (error) {
      next(error);
    }
  }

  async reject(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await cutyService.reject(req);
      sendResponse(res, "Success Reject Cuty", data);
    } catch (error) {
      next(error);
    }
  }
}

export default new CutyController();
