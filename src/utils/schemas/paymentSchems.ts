export type product = {
  productId: number;
  quantity: number;
};

export type paymentPayload = product[];

export type PaymentSchemas = {
  amount: number;
  products: product[];
};
