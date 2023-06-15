import { APIResponse, IntegrationEmailGetNewDto } from "@ustagil/typing";
import { integrationEmailsAddGet } from "@ustagil/web-api";
import { createQuery } from "react-query-kit";

export const useIntegrationEmailsGetNew = createQuery<
  APIResponse<string>,
  IntegrationEmailGetNewDto
>({
  primaryKey: "integration emails get new",
  queryFn: async ({ queryKey: [, variables] }) =>
    await integrationEmailsAddGet(variables),
});
