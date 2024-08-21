export type product = {
  productId: number;
  quantity: number;
  price: number;
};

export type paymentPayload = product[];

export type PaymentSchemas = {
  amount: number;
  products: product[];
};
