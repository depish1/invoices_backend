import { Request, Response } from "express";

import { EditInvoiceBodyType, InvoiceBodyType } from "../types/invoices.types";
import {
  addInvoiceHead,
  deleteInvoiceById,
  getInvoiceHeaderById,
  getInvoicesHeadersByUserId,
  isEditInvoiceBodyType,
  isInvoiceBodyType,
  updateInvoice,
} from "../services/invoices.service.js";
import { addProducts, calculateProductsGrossAmount, getProductsByInvoiceId } from "../services/products.service.js";

export const addInvoice = async ({ body }: Request<InvoiceBodyType>, res: Response) => {
  const { id } = res.locals;
  if (!isInvoiceBodyType(body)) return res.status(422).send("Bad request body");
  const { products, ...invoiceHead } = body;
  const grossSumAmount = calculateProductsGrossAmount(products);
  const invoice = await addInvoiceHead(invoiceHead, id, grossSumAmount);
  await addProducts(body.products, invoice.id);

  return res.status(201).json({ message: "Invoice added successfully" });
};

export const editInvoices = async ({ body }: Request<EditInvoiceBodyType>, res: Response) => {
  if (!body.id || !isEditInvoiceBodyType(body)) return res.status(422).send("Bad request body");
  await updateInvoice(body);

  return res.status(200).json({ message: "OK" });
};

export const getInvoices = async (_: Request, res: Response) => {
  const { id } = res.locals;
  const invoices = await getInvoicesHeadersByUserId(id);
  return res.status(200).json(invoices);
};

export const getInvoice = async ({ params }: Request, res: Response) => {
  const id = +params.id;
  if (!id) return res.status(422).send("Bad request body");

  const invoiceHeader = await getInvoiceHeaderById(id);
  const products = await getProductsByInvoiceId(id);

  if (!invoiceHeader || !products) return res.status(404).json({ message: "Not found" });

  return res.status(200).json({ ...invoiceHeader, products });
};

export const deleteInvoice = async ({ params }: Request, res: Response) => {
  const id = +params.id;
  if (!id) return res.status(422).json({ message: "Bad request body" });

  const invoiceHeader = await getInvoiceHeaderById(id);
  if (!invoiceHeader) return res.status(404).send();
  await deleteInvoiceById(id);
  return res.status(200).json({ message: "OK" });
};
