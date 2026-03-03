/** @format */
import { Err403 } from "@/class/customError";
import { AttendanceCreateInput } from "@/generated/prisma/models";
import db from "@/lib/prisma";
import { createAttendanceSchema } from "@/lib/schema/createAttendance.schema";
import { querySchema } from "@/lib/schema/query.schema";
import { imageBuffer } from "@/lib/sharp";
import { Request } from "express";

export class attendanceService {
  async getAll(req: Request) {
    const { take, skip, username } = querySchema.parse(req.query);
    const data = await db.attendance.findMany({
      where: {
        user: { name: { contains: username } },
        location: {
          isDeleted: false,
        },
      },
      take,
      skip,
    });
    return data;
  }

  async create(req: Request) {
    const userId = req.user.id;
    const { locationId, type } = createAttendanceSchema.parse(req.body);

    const isAllow = await db.address.findUnique({
      where: {
        id: locationId,
        userAddressAllow: { some: { userId } },
        isDeleted: false,
      },
    });

    if (!isAllow) throw new Err403("Not Allowed / Location Not Found");

    const { buffer } = await imageBuffer(req.file);
    const data: AttendanceCreateInput = {
      image: { create: { image: buffer, type: "Attandance" } },
      user: { connect: { id: userId } },
      location: { connect: { id: locationId } },
      type: type,
    };

    return await db.attendance.create({
      data,
    });
  }
}

export default new attendanceService();
