import {
  APIResponse,
  Integration,
  IntegrationGetDto,
  IntegrationListDto,
} from "@ustagil/typings";
import { axiosInstance } from "@ustagil/utils";
import { stringify } from "querystring";

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
      `/integrations?${stringify({
        start: pageIndex * pageSize,
        end: (pageIndex + 1) * pageSize,
        app,
        email,
        errorMessage,
        lastSentMessage,
        name,
        status,
      })}`
    )
  ).data;

export const integrationsGet = async ({
  params: { id },
  query,
}: IntegrationGetDto) =>
  (
    await axiosInstance.get<APIResponse<Integration>>(
      `/integrations/${id}?${stringify(query)}`
    )
  ).data;
