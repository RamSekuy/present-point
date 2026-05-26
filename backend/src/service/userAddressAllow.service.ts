/** @format */
import db from "@/lib/prisma";
import { stringSchema } from "@/lib/schema/string.schema";
import { Request } from "express";

export class UserAddressAllowService {
  async create(req: Request) {
    console.log(req.body);
    const userId = stringSchema.parse(req.body.userId);
    const addressId = stringSchema.parse(req.params.addressId);
    const data = db.userAddressAllow.create({
      data: { userId, addressId },
      select: { user: true },
    });
    return data.user();
  }

  async delete(req: Request) {
    const addressId = stringSchema.parse(req.params.addressId);
    const userId = stringSchema.parse(req.params.userId);
    console.log(addressId, userId);
    return db.userAddressAllow.delete({
      where: { userId_addressId: { userId, addressId } },
    });
  }
}

export default new UserAddressAllowService();
