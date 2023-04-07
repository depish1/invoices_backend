import { Request, Response } from "express";

export const handleHealthEndpoint = (_: Request, res: Response) => {
  console.log("Server is healthy");
  res.status(200).json({ status: "OK" });
};
