import express, { Request, Response } from "express";

import { handleHealthEndpoint } from "../controllers/server.controller.js";

const router = express.Router();

router.get("/health", (req: Request, res: Response) => handleHealthEndpoint(req, res));

export default router;
