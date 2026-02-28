/** @format */
import db from "@/lib/prisma";
import { querySchema } from "@/lib/schema/query.schema";
import { stringSchema } from "@/lib/schema/string.schema";
import { Request } from "express";

export class AddressService {
  async getAll(req: Request) {
    const { take, skip, username } = querySchema.parse(req.query);
    return db.address.findMany({
      where: { isDeleted: false },
      take,
      skip,
    });
  }

  async getById(req: Request) {
    const id = stringSchema.parse(req.params.id);
    return db.address.findUnique({
      where: { id, isDeleted: false },
    });
  }

  async create(req: Request) {
    // Validasi dan parsing body bisa disesuaikan dengan kebutuhan schema
    const { longitude, latitude, radius } = req.body;
    return db.address.create({
      data: { longitude, latitude, radius },
    });
  }

  async delete(req: Request) {
    const id = stringSchema.parse(req.params.id);
    return db.address.update({
      where: { id },
      data: { isDeleted: true },
    });
  }
}

export default new AddressService();
