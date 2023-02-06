import { integrationsGet, integrationsList } from "@acme/api";
import {
  APIResponse,
  Integration,
  IntegrationGetDto,
  IntegrationListDto,
} from "@acme/typings";
import { createQuery } from "react-query-kit";

export const useIntegrationsList = createQuery<
  APIResponse<Integration[]>,
  IntegrationListDto
>({
  primaryKey: "integrations list",
  queryFn: async ({ queryKey: [_, variables] }) =>
    await integrationsList(variables),
});

export const useIntegrationsGet = createQuery<
  APIResponse<Integration>,
  IntegrationGetDto
>({
  primaryKey: "integrations get",
  queryFn: async ({ queryKey: [_, variables] }) =>
    await integrationsGet(variables),
});
