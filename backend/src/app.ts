/** @format */
import { PORT, corsOption } from "./config/config";
import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import { ZodError } from "zod";
import { Err401, Err403, Err404, Err400 } from "./class/customError";
import { PrismaClientUnknownRequestError } from "./generated/prisma/internal/prismaNamespace";
import authRouter from "@router/auth.router";
import imageRouter from "@router/image.router";
import addressRouter from "@router/address.router";
import userRouter from "@router/user.router";
import userAddressAllowRouter from "./router/userAddressAllow.router";
import attendanceRouter from "@router/attendance.router";
import cutyRouter from "./router/cuty.router";

export class App {
  private app: Application;
  constructor() {
    this.app = express();
    this.configure();
    this.routes();
    this.errorHandler();
  }

  private routes() {
    this.app.use("/", (req, res, next) => {
      console.log(req.method, req.path);
      next();
    });
    this.app.use("/auth", authRouter.getRouter);
    this.app.use("/user", userRouter.getRouter);
    this.app.use("/image", imageRouter.getRouter);
    this.app.use("/address", addressRouter.getRouter);
    this.app.use("/cuty", cutyRouter.getRouter);
    this.app.use("/attendance", attendanceRouter.getRouter);
    this.app.use("/userAddressAllow", userAddressAllowRouter.getRouter);
  }

  private errorHandler() {
    this.app.use(
      (error: unknown, req: Request, res: Response, next: NextFunction) => {
        console.error(error);
        if (error instanceof ZodError) {
          console.log(error.message);
          res.status(401).send({
            message: error.issues[0].message,
          });
        } else if (error instanceof Err404) {
          const msg = error.message || "Not Found";
          console.log(msg);
          res.status(404).send({ message: msg });
        } else if (error instanceof Err403) {
          const msg = error.message || "Forbidden";
          console.log(msg);
          res.status(403).send({ message: msg });
        } else if (error instanceof Err401) {
          const msg = error.message || "Unauthorized";
          console.log(msg);
          res.status(401).send({ message: msg });
        } else if (error instanceof Err400) {
          const msg = error.message || "Invalid Request";
          console.log(msg);
          res.status(401).send({ message: msg });
        } else if (error instanceof PrismaClientUnknownRequestError) {
          console.log(error.message);
          res.status(500).send({
            message: "Database Connection Error",
          });
        } else if (error instanceof Error) {
          console.log(error);
          res.status(500).send({
            message: error.message,
          });
        }
      },
    );
  }

  private configure() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors(corsOption));
    this.app.options("*", cors(corsOption));
  }
  public start() {
    this.app.listen(PORT, () => {
      console.log(`http://localhost:${PORT}`);
    });
  }
}
