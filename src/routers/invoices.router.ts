import express from "express";

import { EditInvoiceBodyType, InvoiceBodyType } from "../types/invoices.types.js";
import {
  addInvoice,
  deleteInvoice,
  editInvoices,
  getInvoices,
  getInvoice,
} from "../controllers/invoices.controller.js";
import { verifyTokenMiddleware } from "../middleware/verifyToken.js";

const router = express.Router();

router.use(verifyTokenMiddleware);

router.post<InvoiceBodyType>("", (req, res) => addInvoice(req, res));
router.get("", (req, res) => getInvoices(req, res));
router.get("/:id", (req, res) => getInvoice(req, res));
router.delete("/:id", (req, res) => deleteInvoice(req, res));
router.put<EditInvoiceBodyType>("/:id", (req, res) => editInvoices(req, res));

export default router;
