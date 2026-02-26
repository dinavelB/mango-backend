// routes

import { Router } from "express";
import UserController from "../controllers/createacc-contoller.js";
const router = Router();

const userClass = new UserController();
router.post("/", userClass.createAccount);
router.post("/login", userClass.userLogin);

export default router;
