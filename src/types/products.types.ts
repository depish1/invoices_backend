export type ProductType = {
  name: string;
  quantity: number;
  net_price: number;
  tax_rate: number;
  gross_amount: number;
  id?: number;
  invoice_id?: number;
};
