/** @format */
import { Router } from "express";
import userAddressAllowController from "@/controller/userAddressAllow.controller";
import userMiddleware from "@/middleware/auth.middleware";

const router = Router();

router.post("/", userMiddleware.authValidate, userAddressAllowController.add);
router.delete(
  "/:addressId",
  userMiddleware.authValidate,
  userAddressAllowController.delete,
);

export default router;
