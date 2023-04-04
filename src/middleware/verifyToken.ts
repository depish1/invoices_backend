import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const verifyTokenMiddleware = (req: Request, res: Response<any, { id: number }>, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET as string, async (err: any, data: any) => {
    if (err) return res.status(401).json({ message: "Auth failed" });

    res.locals.id = data.id;

    next();
  });
};
