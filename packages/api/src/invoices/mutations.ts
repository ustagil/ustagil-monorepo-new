import {
  APIResponse,
  Invoice,
  InvoiceCreateDto,
  InvoiceDeleteDto,
  InvoiceUpdateDto,
} from "@ustagil/typing";
import { axiosInstance } from "@ustagil/util";

export const invoicesCreate = async ({ query, body }: InvoiceCreateDto) =>
  (
    await axiosInstance.post<APIResponse<Invoice>>(
      `/invoices?${new URLSearchParams(query).toString()}`,
      body
    )
  ).data;
export const invoicesUpdate = async ({
  params: { id },
  body,
}: InvoiceUpdateDto) =>
  (await axiosInstance.patch<APIResponse<Invoice>>(`/invoices/${id}`, body))
    .data;

export const invoicesDelete = async ({ params: { id } }: InvoiceDeleteDto) =>
  (await axiosInstance.delete<APIResponse<Invoice>>(`/invoices/${id}`)).data;
