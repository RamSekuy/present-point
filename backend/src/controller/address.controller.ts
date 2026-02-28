/** @format */
import { NextFunction, Request, Response } from "express";
import locationService from "@/service/location.service";
import { sendResponse } from "@/utils/sendResponse";

export class AddressController {
  private service = locationService;

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.service.getAll(req);
      sendResponse(res, "get all locations", data);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.service.getById(req);
      sendResponse(res, "get location by id", data);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.service.create(req);
      sendResponse(res, "location created", data);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.service.delete(req);
      sendResponse(res, "location deleted", data);
    } catch (error) {
      next(error);
    }
  }
}

export default new AddressController();
