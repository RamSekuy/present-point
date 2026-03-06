import userService from "@/service/user.service";
import { sendResponse } from "@/utils/sendResponse";
import { NextFunction, Request, Response } from "express";

export class UserController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await userService.getAll(req);
      sendResponse(res, "Success Get Users", data);
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
