import { Request, Response } from "express";

import { getUserById } from "../services/users.service.js";

export const getUserData = async (_: Request, res: Response<any, { id: number }>) => {
  const { id } = res.locals;
  const user = await getUserById(id);
  if (!user) return res.status(404).json({ message: "User not found" });
  return res.status(200).json({ user });
};
