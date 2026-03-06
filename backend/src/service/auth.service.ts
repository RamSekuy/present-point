/** @format */
import { Request } from "express";
import { loginSchema, registerSchema } from "@lib/schema/auth.schema";
import db from "@/lib/prisma";
import { signToken, verifyToken } from "@/lib/jwt";
import { comparePassword, hashPassword } from "@/lib/bcrypt";
import { Err401, Err403, Err404 } from "@/class/customError";
import { TUserJWT } from "@/model/userJWT.model";
import { verifyEmail, verifyNewEmail } from "@/lib/nodemailer";
import { User } from "@/generated/prisma/client";
import { imageBuffer } from "@/lib/sharp";
import { userUpdateSchma } from "@/lib/schema/userUpdateSchema";
import { v4 } from "uuid";

export class AuthService {
  private sendEmailValidation(
    user: User,
    template: "verify" | "newEmail" = "verify",
  ) {
    const payload = {
      full_name: user.name,
      subject: "Verify your account",
      token: signToken({ id: user.id }, "refresh"),
    };
    const email = user.email;
    template == "verify"
      ? verifyEmail(payload, email)
      : verifyNewEmail(payload, email);
  }

  async register(req: Request) {
    // schema validation
    const data = registerSchema.parse(req.body);
    // hash password
    data.password = await hashPassword(data.password);
    // image handler
    const { buffer } = await imageBuffer(req.file);
    // save to db
    const user = await db.user.create({
      data: {
        ...data,
        image: {
          create: {
            image: buffer,
            type: "Avatar",
          },
        },
      },
    });
    this.sendEmailValidation(user as User);
    return user;
  }

  async login(req: Request) {
    // schema validation
    const data = loginSchema.parse(req.body);
    console.log(data);
    // check user in db
    const user = await db.user.findUnique({
      where: { email: data.email },
      omit: { password: false },
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
      {
        id: user.id,
        isAdmin: user.isAdmin,
        imageId: user.imageId,
        email: user.email,
        name: user.name,
      },
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
        {
          id: user.id,
          isAdmin: user.isAdmin,
          imageId: user.imageId,
          email: user.email,
          name: user.name,
        },
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

    if (!data) throw new Err401("Invalid JWT Data");
    const user = await db.user.findUnique({
      where: { id: data.id },
      omit: { password: false },
    });
    if (!user) throw new Err401("Invalid JWT User Data");
    return user;
  }

  async verifyEmail(req: Request) {
    const token = req.params.token;
    let data;
    verifyToken(token)(async (err, decoded) => {
      if (err) throw new Error(err.message);
      await db.user.update({
        data: { isVerify: true },
        where: { id: decoded.id },
      });
    });

    return;
  }

  async update(req: Request) {
    const data = userUpdateSchma.parse(req.body);
    const account = await db.user.findUnique({
      where: { id: req.params.userId },
    });
    if (!account) throw new Err401("Invalid UserId");
    const { buffer } = req.file
      ? await imageBuffer(req.file)
      : { buffer: undefined };
    if (!data.email || data.email == account.email) {
      const newData = await db.user.update({
        where: { id: account.id },
        data: {
          ...data,
          image: { update: { image: buffer, id: buffer ? v4() : undefined } },
        },
      });
      return { ...newData, password: undefined };
    }
    const newData = await db.user.update({
      data: {
        ...data,
        isVerify: false,
        image: { update: { image: buffer, id: buffer ? v4() : undefined } },
      },
      where: { id: req.params.userId },
    });
    // reverify new email
    this.sendEmailValidation(newData as User, "newEmail");
    return { ...newData, password: undefined };
  }

  async me(req: Request) {
    const data = await db.user.findUnique({ where: { id: req.user.id } });
    if (!data) throw new Err404("User Not Found");
    return data;
  }
}

export default new AuthService();
