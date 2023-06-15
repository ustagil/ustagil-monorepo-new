import {
  APIResponse,
  Invoice,
  InvoiceGetDto,
  InvoiceListDto,
} from "@ustagil/typing";
import { axiosInstance } from "@ustagil/web-util";

export const invoicesList = async ({ query }: InvoiceListDto) =>
  (
    await axiosInstance.get<APIResponse<Invoice[]>>(
      `/invoices?${new URLSearchParams({
        pageIndex: query.pageIndex.toString(),
        pageSize: query.pageSize.toString(),
      }).toString()}`
    )
  ).data;

export const invoicesGet = async ({ params: { id }, query }: InvoiceGetDto) =>
  (
    await axiosInstance.get<APIResponse<Invoice>>(
      `/invoices/${id}?${new URLSearchParams(query).toString()}`
    )
  ).data;
