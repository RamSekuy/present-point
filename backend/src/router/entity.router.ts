import { Router } from "express";

export class EntityRouter {
  public router: Router;
  constructor() {
    this.router = Router();
  }

  public get getRouter() {
    return this.router;
  }
}
