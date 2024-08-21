export type VANumber = {
  bank: string;
  va_number: string;
};

export type TransactionResponse = {
  status_code: string;
  transaction_id: string;
  gross_amount: string;
  currency: string;
  order_id: string;
  payment_type: string;
  signature_key: string;
  transaction_status: string;
  fraud_status: string;
  status_message: string;
  merchant_id: string;
  va_numbers: VANumber[];
  payment_amounts: any[];
  transaction_time: string;
  settlement_time: string;
  expiry_time: string;
};
