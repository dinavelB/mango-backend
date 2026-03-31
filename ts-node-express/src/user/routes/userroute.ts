// routes

import { Router } from "express";
import UserController from "../controllers/createacc-contoller.js";
import { VerifyOtp } from "../controllers/otp.controller.js";

const router = Router();

const userClass = new UserController();
router.post("/", userClass.createAccount);
router.post("/login", userClass.userLogin);
router.post("/logout", userClass.Logout);
router.post("/verify-otp", VerifyOtp);
export default router;
