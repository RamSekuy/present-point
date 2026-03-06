/** @format */
import db from "@/lib/prisma";
import { querySchema } from "@/lib/schema/query.schema";
import { stringSchema } from "@/lib/schema/string.schema";
import { Request } from "express";

export class UserService {
  async getAll(req: Request) {
    const { skip, take } = querySchema.parse(req.query);
    return await db.user.findMany({
      where: {},
      include: { userAddressAllow: true },
      skip,
      take,
    });
  }
}

export default new UserService();
