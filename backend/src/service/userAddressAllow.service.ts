/** @format */
import db from "@/lib/prisma";
import { stringSchema } from "@/lib/schema/string.schema";
import { Request } from "express";

export class UserAddressAllowService {
  async create(req: Request) {
    const userId = stringSchema.parse(req.body.userId);
    const addressId = stringSchema.parse(req.params.addressId);
    const data = db.userAddressAllow.create({
      data: { userId, addressId },
      select: { user: true },
    });
    return data.user();
  }

  async delete(req: Request) {
    const userId = req.user.id;
    const addressId = stringSchema.parse(req.params.addressId);
    return db.userAddressAllow.delete({
      where: { userId_addressId: { userId, addressId } },
    });
  }
}

export default new UserAddressAllowService();
