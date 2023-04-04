import { Request, Response } from "express";

import { AuthBodyType } from "../types/auth.types.js";
import { addNewUser, checkIfEmailIsAlreadyRegistered, getUserByEmail } from "../services/users.service.js";
import { generateToken, hashPassword, isAuthBodyType, validPassword } from "../services/auth.service.js";

export const login = async ({ body }: Request<AuthBodyType>, res: Response) => {
  if (!isAuthBodyType(body)) return res.status(422).json({ message: "Bad request body" });
  const user = await getUserByEmail(body.email);
  if (!user) return res.status(401).json({ message: "Login failed" });
  const isPasswordValid = await validPassword(body.password, user.password);
  if (!isPasswordValid) return res.status(401).json({ message: "Login failed" });
  const access_token = generateToken(user.id);
  return res.status(200).send({ access_token, user });
};

export const register = async ({ body }: Request<AuthBodyType>, res: Response) => {
  if (!isAuthBodyType(body)) return res.status(422).json({ message: "Bad request body" });
  const isEmailAlreadyRegistered = await checkIfEmailIsAlreadyRegistered(body.email);
  if (isEmailAlreadyRegistered) return res.status(409).json({ message: "Account with this email already exists" });
  const hashedPassword = await hashPassword(body.password);
  await addNewUser({ ...body, password: hashedPassword });

  return res.status(201).json({ message: "User created" });
};
