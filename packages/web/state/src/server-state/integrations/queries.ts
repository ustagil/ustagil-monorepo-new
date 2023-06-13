import { integrationsGet, integrationsList } from "@ustagil/api";
import {
  APIResponse,
  Integration,
  IntegrationGetDto,
  IntegrationListDto,
} from "@ustagil/typing";
import { createQuery } from "react-query-kit";

export const useIntegrationsList = createQuery<
  APIResponse<Integration[]>,
  IntegrationListDto
>({
  primaryKey: "integrations list",
  queryFn: async ({ queryKey: [, variables] }) =>
    await integrationsList(variables),
});

export const useIntegrationsGet = createQuery<
  APIResponse<Integration>,
  IntegrationGetDto
>({
  primaryKey: "integrations get",
  queryFn: async ({ queryKey: [, variables] }) =>
    await integrationsGet(variables),
});
