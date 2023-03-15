import {
  APIResponse,
  Integration,
  IntegrationCreateDto,
  IntegrationDeleteDto,
  IntegrationUpdateDto,
} from "@ustagil/typing";
import { axiosInstance } from "@ustagil/util";

export const integrationsCreate = async ({
  query,
  body,
}: IntegrationCreateDto) =>
  (
    await axiosInstance.post<APIResponse<Integration>>(
      `/integrations?${new URLSearchParams(query).toString()}`,
      body
    )
  ).data;
export const integrationsUpdate = async ({
  params: { id },
  body,
}: IntegrationUpdateDto) =>
  (
    await axiosInstance.patch<APIResponse<Integration>>(
      `/integrations/${id}`,
      body
    )
  ).data;

export const integrationsDelete = async ({
  params: { id },
}: IntegrationDeleteDto) =>
  (await axiosInstance.delete<APIResponse<Integration>>(`/integrations/${id}`))
    .data;
