import {
  APIResponse,
  Invoice,
  InvoiceGetDto,
  InvoiceListDto,
} from "@acme/typings";
import { axiosInstance } from "@acme/utils";
import { stringify } from "querystring";

export const invoicesList = async ({ query }: InvoiceListDto) =>
  (
    await axiosInstance.get<APIResponse<Invoice[]>>(
      `/invoices?${stringify(query)}`
    )
  ).data;

export const invoicesGet = async ({ params: { id }, query }: InvoiceGetDto) =>
  (
    await axiosInstance.get<APIResponse<Invoice>>(
      `/invoices/${id}?${stringify(query)}`
    )
  ).data;