import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from "express";
import cors from "cors";

import mysql from "mysql";

import dbConfig from "./config/dbConfig.js";
import auth from "./routers/auth.router.js";
import user from "./routers/users.router.js";
import invoices from "./routers/invoices.router.js";
import server from "./routers/server.router.js";

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mysql.createConnection(dbConfig);

app.use("/api/auth", auth);
app.use("/api/users", user);
app.use("/api/invoices", invoices);
app.use("/server", server);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
