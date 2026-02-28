/** @format */
import { Router } from "express";
import userAddressAllowController from "@/controller/userAddressAllow.controller";
import userMiddleware from "@/middleware/auth.middleware";

const router = Router();

router.post("/", userMiddleware.aauthValidate, userAddressAllowController.add);
router.delete(
  "/:addressId",
  userMiddleware.aauthValidate,
  userAddressAllowController.delete,
);

export default router;
