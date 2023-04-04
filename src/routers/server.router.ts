import express, { Request, Response } from "express";

import { getUserData } from "../controllers/users.controller.js";
import { verifyTokenMiddleware } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/health", (req: Request, res: Response) => res.status(200).json({ status: "OK" }));

export default router;
