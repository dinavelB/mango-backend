import { Router } from "express";
import { createAccount } from "../controllers/createacc-contoller.js";

const router = Router();

router.post("/", createAccount);

export default router;
