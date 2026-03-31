/** @format */
import db from "@/lib/prisma";
import { Err400 } from "@/class/customError";
import { confirmCutySchema } from "@/lib/schema/confirmCuty";
import { createCutySchema } from "@/lib/schema/createCuty";
import { querySchema } from "@/lib/schema/query.schema";
import { Request } from "express";

export class cutyService {
  async getAll(req: Request) {
    const { take, skip, username } = querySchema.parse(req.query);
    const data = await db.cuty.findMany({
      where: {
        user: { name: { contains: username } },
      },
      take,
      skip,
    });
    return data;
  }

  async getOwn(req: Request) {
    const { take, skip } = querySchema.parse(req.query);
    const data = await db.cuty.findMany({
      where: {
        user: { id: req.user.id },
      },
      take,
      skip,
    });
    return data;
  }

  async create(req: Request) {
    const { startDate, endDate } = createCutySchema.parse(req.body);
    if (!(startDate.getTime() <= endDate.getTime())) {
      throw new Err400("Invalid Cuty Date");
    }
    return await db.cuty.create({
      data: {
        startDate,
        endDate,
        userId: req.user.id,
      },
    });
  }

  async confirm(req: Request) {
    const { cutyId } = confirmCutySchema.parse(req.params);
    return db.cuty.update({
      where: { id: cutyId },
      data: { isConfirmed: true },
    });
  }
}

export default new cutyService();
