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
    console.log("creating attendance");
    console.log("lng", req.body.longitude);
    console.log("lat", req.body.latitude);
    const { addressId, type } = createAttendanceSchema.parse(req.body);

    const isAllow = await db.address.findUnique({
      where: {
        id: addressId,
        userAddressAllow: { some: { userId: req.user.id } },
        isDeleted: false,
      },
    });

    if (!isAllow) throw new Err403("Not Allowed / Location Not Found");
    console.log(req.file);
    const { buffer } = await imageBuffer(req.file);
    const data: AttendanceCreateInput = {
      image: { create: { image: buffer, type: "Attandance" } },
      user: { connect: { id: req.user.id } },
      location: { connect: { id: addressId } },
      type: type,
    };

    return await db.attendance.create({
      data,
    });
  }
}

export default new attendanceService();
