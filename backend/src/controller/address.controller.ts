/** @format */
import { NextFunction, Request, Response } from "express";
import addressService from "@/service/address.service";
import { sendResponse } from "@/utils/sendResponse";

export class AddressController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await addressService.getAll(req);
      sendResponse(res, "Success Get Addresses", data);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await addressService.getById(req);
      sendResponse(res, "Success Get Address", data);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await addressService.create(req);
      sendResponse(res, "Success Create Address", data);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await addressService.delete(req);
      sendResponse(res, "Success Delete Address", data);
    } catch (error) {
      next(error);
    }
  }
}

export default new AddressController();
