import {
  APIResponse,
  Invoice,
  InvoiceGetDto,
  InvoiceListDto,
} from "@ustagil/typing";
import { invoicesGet, invoicesList } from "@ustagil/web-api";
import { createQuery } from "react-query-kit";

export const useInvoicesList = createQuery<
  APIResponse<Invoice[]>,
  InvoiceListDto
>({
  primaryKey: "invoices list",
  queryFn: async ({ queryKey: [, variables] }) => await invoicesList(variables),
});

export const useInvoicesGet = createQuery<APIResponse<Invoice>, InvoiceGetDto>({
  primaryKey: "invoices get",
  queryFn: async ({ queryKey: [, variables] }) => await invoicesGet(variables),
});
