import { ProductType } from "./products.types";

export type ParamsWithIdType = {
  id: string;
};

export type InvoiceBodyType = {
  products: ProductType[];

  seller_name: string;
  seller_address1: string;
  seller_address2?: string;
  seller_nip: string;

  buyer_name: string;
  buyer_address1: string;
  buyer_address2?: string;
  buyer_nip: string;
  gross_sum_amount: number;
};

export type EditInvoiceBodyType = InvoiceBodyType & { id: string };
