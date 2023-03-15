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

export type InvoiceGetDto = {
  params: { id: string };
  query: Record<string, never>;
};

export type InvoiceListDto = {
  params: Record<string, never>;
  query: { pageIndex: number; pageSize: number };
};

export type InvoiceCreateDto = {
  params: Record<string, never>;
  query: Record<string, never>;
  body: { amount: number };
};

export type InvoiceUpdateDto = {
  params: { id: string };
  body: { billingPlanName?: string };
};

export type InvoiceDeleteDto = { params: { id: string } };
