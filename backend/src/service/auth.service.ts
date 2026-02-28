/** @format */
import { Request } from "express";
import { loginSchema, registerSchema } from "@lib/schema/auth.schema";
import db from "@/lib/prisma";
import { signToken, verifyToken } from "@/lib/jwt";
import { comparePassword, hashPassword } from "@/lib/bcrypt";
import { Err401, Err403 } from "@/class/customError";
import { TUserJWT } from "@/model/userJWT.model";
import { verifyEmail } from "@/lib/nodemailer";
import { User } from "@/generated/prisma/client";

export class AuthService {
  private sendEmailValidation(user: User) {
    verifyEmail(
      {
        full_name: user.name,
        subject: "Verify your account",
        token: signToken({ id: user.id }, "refresh"),
      },
      user.email,
    );
  }

  async register(req: Request) {
    // schema validation
    const data = registerSchema.parse(req.body);
    // hash password
    data.password = await hashPassword(data.password);
    // save to db
    const user = await db.user.create({ data });
    this.sendEmailValidation(user);
    return user;
  }
  async login(req: Request) {
    // schema validation
    const data = loginSchema.parse(req.body);
    // check user in db
    const user = await db.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      throw new Err401("User Not Found");
    }

    if (!user.isVerify) {
      this.sendEmailValidation(user);
      throw new Err403("Email not Verifeid");
    }

    // check password
    const isPasswordValid = await comparePassword(user.password, data.password);
    if (!isPasswordValid) throw new Error("Invalid Password");
    // generate token
    const refreshToken = signToken({ id: user.id }, "refresh");
    const accessToken = signToken(
      { id: user.id, isAdmin: String(user.isAdmin) },
      "access",
    );
    return {
      refreshToken,
      accessToken,
    };
  }

  async refresh(req: Request) {
    const user = await this.validateAccessToken(req);
    // generate new access token
    return {
      refreshToken: signToken({ id: user.id }, "refresh"),
      accessToken: signToken(
        { id: user.id, isAdmin: String(user.isAdmin) },
        "access",
      ),
    };
  }

  private getAuthToken(req: Request) {
    const token = req.headers.authorization;
    if (
      !(
        token &&
        token?.startsWith("Bearer ") &&
        token.trim().split(" ").length === 2
      )
    ) {
      throw new Err401("Invalid refresh token");
    }
    return token.split(" ")[1];
  }

  async validateAccessToken(req: Request) {
    const token = this.getAuthToken(req);
    let data: TUserJWT | undefined;
    verifyToken(token)((err, decoded) => {
      if (err) throw new Error(err.message);
      data = decoded;
    });

    if (!data) throw new Err403("Invalid JWT Data");
    const user = await db.user.findUnique({ where: { id: data.id } });
    if (!user) throw new Error("Invalid JWT User Data");
    return user;
  }
}

export default new AuthService();
