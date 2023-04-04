import express from "express";

import { login, register } from "../controllers/auth.controller.js";
import { AuthBodyType } from "../types/auth.types.js";

const router = express.Router();

router.post<AuthBodyType>("/login", (req, res) => login(req, res));
router.post<AuthBodyType>("/register", (req, res) => register(req, res));

export default router;
