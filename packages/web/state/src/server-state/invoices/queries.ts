import { invoicesGet, invoicesList } from "@ustagil/api";
import {
  APIResponse,
  Invoice,
  InvoiceGetDto,
  InvoiceListDto,
} from "@ustagil/typing";
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
