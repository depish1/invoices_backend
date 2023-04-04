import prisma from "../config/prisma.js";
import { AuthBodyType } from "../types/auth.types.js";

export const checkIfEmailIsAlreadyRegistered = async (email: string) => {
  return !!(await prisma.user.findFirst({ where: { email } }));
};

export const addNewUser = async (registerData: AuthBodyType) => {
  return await prisma.user.create({ data: registerData });
};

export const getUserByEmail = async (email: string) => {
  return await prisma.user.findFirst({ where: { email } });
};

export const getUserById = async (id: number) => {
  return await prisma.user.findFirst({ where: { id } });
};

export const verifyId = async (id: number) => {
  return !!(await prisma.user.findFirst({ where: { id } }));
};
