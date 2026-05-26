/** @format */
import { Prisma } from "@/generated/prisma/client";
import db from "@/lib/prisma";
import { createAddressSchema } from "@/lib/schema/createAddress";
import { updateAddressSchema } from "@/lib/schema/updateAddress";
import { querySchema } from "@/lib/schema/query.schema";
import { stringSchema } from "@/lib/schema/string.schema";
import { Request } from "express";

class AddressService {
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
    const opt: Prisma.AddressFindUniqueArgs = {
      where: { id, isDeleted: false },
      include: { userAddressAllow: { include: { user: true } } },
    };
    return db.address.findUnique(opt);
  }

  async create(req: Request) {
    // Validasi dan parsing body bisa disesuaikan dengan kebutuhan schema
    const data = createAddressSchema.parse(req.body);
    return db.address.create({
      data,
    });
  }

  async delete(req: Request) {
    const id = stringSchema.parse(req.params.id);
    return db.address.update({
      where: { id },
      data: { isDeleted: true },
    });
  }

  async update(req: Request) {
    const id = stringSchema.parse(req.params.id);
    const data = updateAddressSchema.parse(req.body);
    return db.address.update({
      where: { id },
      data,
    });
  }
}

export default new AddressService();
