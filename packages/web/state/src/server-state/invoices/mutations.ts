import { invoicesCreate, invoicesDelete, invoicesUpdate } from "@ustagil/api";
import {
  APIResponse,
  Invoice,
  InvoiceCreateDto,
  InvoiceDeleteDto,
  InvoiceUpdateDto,
} from "@ustagil/typing";
import { createMutation } from "react-query-kit";

export const useInvoicesCreate = createMutation<
  APIResponse<Invoice>,
  InvoiceCreateDto
>({
  mutationKey: ["invoices", "create"],
  mutationFn: async (variables) => await invoicesCreate(variables),
});

export const useInvoicesUpdate = createMutation<
  APIResponse<Invoice>,
  InvoiceUpdateDto
>({
  mutationKey: ["invoices", "update"],
  mutationFn: async (variables) => await invoicesUpdate(variables),
});

export const useInvoicesDelete = createMutation<
  APIResponse<Invoice>,
  InvoiceDeleteDto
>({
  mutationKey: ["invoices", "delete"],
  mutationFn: async (variables) => await invoicesDelete(variables),
});
