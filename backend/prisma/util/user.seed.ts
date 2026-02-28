import { hashPassword } from "../../src/lib/bcrypt";
import db from "../..//src/lib/prisma";
import { UserCreateInput } from "@/generated/prisma/models";
const user: UserCreateInput = {
  name: "Pria Solo",
  email: "swidodo@gmail.com",
  password: "password",
  isAdmin: true,
  isVerify: true,
};

export const insertUser = async () => {
  await db.user.create({
    data: { ...user, password: await hashPassword(user.password) },
  });
};
