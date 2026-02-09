/** @format */
import { PORT, corsOption } from "./config/config";
import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import authRouter from "@router/auth.router";
import { ZodError } from "zod";
import newsRouter from "./router/news.router";
import imageRouter from "./router/image.router";

export class App {
  private app: Application;
  constructor() {
    this.app = express();
    this.configure();
    this.routes();
    this.errorHandler();
  }

  private routes() {
    this.app.use("/auth", authRouter.getRouter);
    this.app.use("/news", newsRouter.getRouter);
    this.app.use("/image", imageRouter.getRouter);
  }

  private errorHandler() {
    this.app.use(
      (error: unknown, req: Request, res: Response, next: NextFunction) => {
        if (error instanceof ZodError) {
          console.log(error.message);
          res.status(400).send({
            message: error.issues,
          });
        } else if (error instanceof Error) {
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
  }
  public start() {
    this.app.listen(PORT, () => {
      console.log(`http://localhost:${PORT}`);
    });
  }
}
