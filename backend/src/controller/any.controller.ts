import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../utils/sendResponse";
import anyService from "../service/any,service";

export class AnyController {
  private service = anyService;
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.service.getAll(req);
      sendResponse(res, "msg", data);
    } catch (error) {
      next(error);
    }
  }
}

export default new AnyController();
