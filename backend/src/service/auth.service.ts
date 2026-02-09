/** @format */
import { Request } from "express";
import { loginSchema, registerSchema } from "@lib/schema/auth.schema";
import db from "@/lib/prisma";
import { signToken, verifyToken } from "@/lib/jwt";
import { comparePassword, hashPassword } from "@/lib/bcrypt";

export class AuthService {
  async register(req: Request) {
    // schema validation
    const data = registerSchema.parse(req.body);
    // hash password
    data.password = await hashPassword(data.password);
    // save to db
    return await db.user.create({ data });
  }
  async login(req: Request) {
    // schema validation
    const data = loginSchema.parse(req.body);
    // check user in db
    const user = await db.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      throw new Error("User Not Found");
    }

    // check password
    const isPasswordValid = await comparePassword(user.password, data.password);
    if (!isPasswordValid) throw new Error("Invalid Password");
    // generate token
    const refreshToken = signToken({ id: user.id }, "refresh");
    const accessToken = signToken({ id: user.id, role: user.role }, "access");
    return {
      refreshToken,
      accessToken,
    };
  }

  async refresh(req: Request) {
    // validate refresh token
    const token = req.headers.authorization;
    if (
      !(
        token &&
        token?.startsWith("Bearer ") &&
        token.trim().split(" ").length === 2
      )
    ) {
      throw new Error("Invalid refresh token");
    }

    // get id from token
    let id = "";
    verifyToken(token.split(" ")[1])((err, decoded) => {
      if (err) throw new Error("Invalid refresh token");
      id = decoded.id;
    });

    // get user from db
    const user = await db.user.findUnique({ where: { id } });
    if (!user) throw new Error("User not found");

    // generate new access token
    return {
      refreshToken: signToken({ id: user.id }, "refresh"),
      accessToken: signToken({ id: user.id, role: user.role }, "access"),
    };
  }
}

export default new AuthService();
