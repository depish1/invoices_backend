import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { AuthBodyType } from "../types/auth.types";

const saltRounds = 10;

export const isAuthBodyType = (item: any): item is AuthBodyType => {
  return "email" in item && "password" in item;
};

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, saltRounds);
};

export const validPassword = async (requestedPassword: string, hashedPassword: string) => {
  return await bcrypt.compare(requestedPassword, hashedPassword);
};

export const generateToken = (id: number) => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, { expiresIn: 3600 });
};
