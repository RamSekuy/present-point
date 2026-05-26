/** @format */
import { Err400, Err403 } from "@/class/customError";
import { AttendanceCreateInput } from "@/generated/prisma/models";
import db from "@/lib/prisma";
import { coordinateSchema } from "@/lib/schema/coordinate";
import { createAttendanceSchema } from "@/lib/schema/createAttendance.schema";
import { querySchema } from "@/lib/schema/query.schema";
import { imageBuffer } from "@/lib/sharp";
import { getDistance } from "@/utils/getDistance";
import { Request } from "express";

export class attendanceService {
  async getAll(req: Request) {
    const { take, skip, username } = querySchema.parse(req.query);
    const data = await db.attendance.findMany({
      where: {
        user: { name: { contains: username } },
        address: {
          isDeleted: false,
        },
      },
      take,
      skip,
    });
    return data;
  }

  async getMine(req: Request) {
    req.query.username = req.user.name;
    return await this.getAll(req);
  }

  async create(req: Request) {
    const { addressId, type, longitude, latitude } =
      createAttendanceSchema.parse({
        ...req.body,
        addressId: req.params.addressId,
      });

    const address = await db.address.findUnique({
      where: {
        id: addressId,
        userAddressAllow: { some: { userId: req.user.id } },
        isDeleted: false,
      },
    });

    if (!address) throw new Err403("Not Allowed / Location Not Found");

    const addressPosition = coordinateSchema.parse(address);
    const distance1 = getDistance(addressPosition, { longitude, latitude });
    const distance2 = getDistance({ longitude, latitude }, addressPosition);
    const { radius } = address;
    if (distance1 > radius) throw new Err400("GPS: Out of Range");

    const { buffer } = await imageBuffer(req.file);
    const data: AttendanceCreateInput = {
      image: { create: { image: buffer, type: "Attandance" } },
      user: { connect: { id: req.user.id } },
      address: { connect: { id: addressId } },
      type: type,
    };

    return await db.attendance.create({
      data,
    });
  }
}

export default new attendanceService();
