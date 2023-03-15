import {
  APIResponse,
  Integration,
  IntegrationGetDto,
  IntegrationListDto,
} from "@ustagil/typing";
import { axiosInstance } from "@ustagil/util";

export const integrationsList = async ({
  query: {
    pageIndex,
    pageSize,
    app,
    email,
    errorMessage,
    lastSentMessage,
    name,
    status,
  },
}: IntegrationListDto) =>
  (
    await axiosInstance.get<APIResponse<Integration[]>>(
      `/integrations?${new URLSearchParams({
        start: String(pageIndex * pageSize),
        end: String((pageIndex + 1) * pageSize),
        app: app ?? "",
        email: email ?? "",
        errorMessage: errorMessage ?? "",
        lastSentMessage: lastSentMessage ?? "",
        name: name ?? "",
        status: status?.toString() ?? "",
      }).toString()}`
    )
  ).data;

export const integrationsGet = async ({
  params: { id },
  query,
}: IntegrationGetDto) =>
  (
    await axiosInstance.get<APIResponse<Integration>>(
      `/integrations/${id}?${new URLSearchParams(query).toString()}`
    )
  ).data;
