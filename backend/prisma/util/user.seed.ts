import { hashPassword } from "../../src/lib/bcrypt";
import db from "../..//src/lib/prisma";
import { createImage } from "./image";
const user = {
  name: "Pria Solo",
  email: "swidodo@gmail.com",
  password: "password",
  isAdmin: true,
  isVerify: true,
};

export const insertUser = async () => {
  const image = await createImage("prisma/util/default.jpg");

  await db.user.create({
    data: {
      ...user,
      password: await hashPassword(user.password),
      image: {
        create: {
          image,
          type: "Avatar",
        },
      },
    },
  });
};
