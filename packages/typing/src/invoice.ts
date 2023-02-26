export type Invoice = {
  id: string;
  amount: string;
  status: number;
  invoiceDate: string;
  paidDate: string;
  recepientName: string;
  billingPlanName: string;
  paymentMethod: string;
};

export type InvoiceGetDto = { params: { id: string }; query: {} };

export type InvoiceListDto = { params: {}; query: {} };

export type InvoiceCreateDto = {
  params: {};
  query: {};
  body: { amount: number };
};

export type InvoiceUpdateDto = {
  params: { id: string };
  body: { billingPlanName?: string };
};

export type InvoiceDeleteDto = { params: { id: string } };
