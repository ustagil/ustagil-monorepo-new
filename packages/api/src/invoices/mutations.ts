import {
  APIResponse,
  Invoice,
  InvoiceCreateDto,
  InvoiceDeleteDto,
  InvoiceUpdateDto,
} from "@ustagil/typing";
import { axiosInstance } from "@ustagil/utils";
import { stringify } from "querystring";

export const invoicesCreate = async ({ query, body }: InvoiceCreateDto) =>
  (
    await axiosInstance.post<APIResponse<Invoice>>(
      `/invoices?${stringify(query)}`,
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
