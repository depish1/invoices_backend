import prisma from "../config/prisma.js";
import { EditInvoiceBodyType, InvoiceBodyType } from "../types/invoices.types";
import { deleteProductsByInvoiceIdQuery, updateProducts } from "./products.service.js";

export const getInvoicesHeadersByUserId = async (user_id: number) => {
  return await prisma.invoice_head.findMany({
    where: {
      user_id,
    },
  });
};

export const getInvoiceHeaderById = async (id: number) => {
  return await prisma.invoice_head.findFirst({
    where: {
      id,
    },
  });
};

export const addInvoiceHead = async (
  body: Omit<InvoiceBodyType, "products">,
  user_id: string,
  gross_sum_amount: number
) => {
  return await prisma.invoice_head.create({ data: { ...body, user_id: +user_id, gross_sum_amount } });
};

const updateInvoiceHead = async (id: string, data: Omit<InvoiceBodyType, "products">) => {
  return await prisma.invoice_head.update({
    where: {
      id: +id,
    },
    data,
  });
};

export const updateInvoice = async (body: EditInvoiceBodyType) => {
  const { id, products, ...rest } = body;
  const invoiceHeadPromise = updateInvoiceHead(id, rest);
  const productsPromise = updateProducts(body.products, +id);

  return Promise.all([invoiceHeadPromise, productsPromise]);
};

export const deleteInvoiceById = async (invoice_id: number) => {
  const deleteProductsQuery = deleteProductsByInvoiceIdQuery(invoice_id);
  const deleteInvoiceHeadQuery = deleteInvoiceHeaderByIdQuery(invoice_id);

  return await prisma.$transaction([deleteProductsQuery, deleteInvoiceHeadQuery]);
};

const deleteInvoiceHeaderByIdQuery = (id: number) =>
  prisma.invoice_head.delete({
    where: {
      id,
    },
  });

export const isInvoiceBodyType = (item: any): item is InvoiceBodyType => {
  return "products" in item && "seller_name" in item && "buyer_name" in item && "seller_nip" in item;
};

export const isEditInvoiceBodyType = (item: any): item is EditInvoiceBodyType => {
  return isInvoiceBodyType(item) && "id" in item;
};
