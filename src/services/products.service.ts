import prisma from "../config/prisma.js";
import { ProductType } from "../types/products.types.js";

export const getProductsByInvoiceId = async (invoice_id: number) => {
  return await prisma.products.findMany({
    where: {
      invoice_id,
    },
  });
};

export const addProducts = async (products: ProductType[], invoice_id: number) => {
  return await prisma.products.createMany({
    data: products.map((product) => ({ ...product, invoice_id })),
  });
};

export const upsertProduct = async ({ id, ...rest }: ProductType, invoice_id: number) => {
  const newProductData = { ...rest, invoice_id };
  return await prisma.products.upsert({
    where: {
      id: id ?? -1,
    },
    update: newProductData,
    create: newProductData,
  });
};

export const updateProducts = async (products: ProductType[], invoice_id: number) => {
  const prevProducts = await getProductsByInvoiceId(invoice_id);
  const prevProductsIds = prevProducts.map(({ id }) => id);
  const newProductsIds = products.map(({ id }) => id);
  const productsIdsToDelete = prevProductsIds.filter((id) => !newProductsIds.includes(id));

  await Promise.all(productsIdsToDelete.map((id) => deleteProductById(id)));
  return await Promise.all(products.map((product) => upsertProduct(product, invoice_id)));
};

export const deleteProductsByInvoiceIdQuery = (invoice_id: number) => {
  return prisma.products.deleteMany({
    where: {
      invoice_id,
    },
  });
};

export const deleteProductById = async (id: number) => {
  return await prisma.products.delete({
    where: {
      id,
    },
  });
};

export const calculateProductsGrossAmount = (products: ProductType[]) =>
  products.map(({ gross_amount }) => gross_amount).reduce((acc, curr) => acc + curr);
