/** @format */
import db from "@/lib/prisma";
import { stringSchema } from "@/lib/schema/string.schema";
import { Request } from "express";

export class UserAddressAllowService {
  async add(req: Request) {
    const userId = req.user.id;
    const addressId = stringSchema.parse(req.body.addressId);
    return db.userAddressAllow.create({
      data: { userId, addressId },
    });
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
