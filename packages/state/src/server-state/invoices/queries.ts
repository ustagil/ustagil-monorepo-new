import { invoicesGet, invoicesList } from "@acme/api";
import {
  APIResponse,
  Invoice,
  InvoiceGetDto,
  InvoiceListDto,
} from "@acme/typings";
import { createQuery } from "react-query-kit";

export const useInvoicesList = createQuery<
  APIResponse<Invoice[]>,
  InvoiceListDto
>({
  primaryKey: "invoices list",
  queryFn: async ({ queryKey: [_, variables] }) =>
    await invoicesList(variables),
});

export const useInvoicesGet = createQuery<APIResponse<Invoice>, InvoiceGetDto>({
  primaryKey: "invoices get",
  queryFn: async ({ queryKey: [_, variables] }) => await invoicesGet(variables),
});
