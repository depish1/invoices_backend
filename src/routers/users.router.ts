import express, { Request, Response } from "express";

import { getUserData } from "../controllers/users.controller.js";
import { verifyTokenMiddleware } from "../middleware/verifyToken.js";

const router = express.Router();

router.use(verifyTokenMiddleware);

router.get("", (req: Request, res: Response<any, { id: number }>) => getUserData(req, res));

export default router;
