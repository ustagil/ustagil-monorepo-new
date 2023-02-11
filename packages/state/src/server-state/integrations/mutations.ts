import {
  integrationsCreate,
  integrationsDelete,
  integrationsUpdate,
} from "@ustagil/api";
import {
  APIResponse,
  Integration,
  IntegrationCreateDto,
  IntegrationDeleteDto,
  IntegrationUpdateDto,
} from "@ustagil/typings";
import { createMutation } from "react-query-kit";

export const useIntegrationsCreate = createMutation<
  APIResponse<Integration>,
  IntegrationCreateDto
>({
  mutationKey: ["integrations", "create"],
  mutationFn: async (variables) => await integrationsCreate(variables),
});

export const useIntegrationsUpdate = createMutation<
  APIResponse<Integration>,
  IntegrationUpdateDto
>({
  mutationKey: ["integrations", "update"],
  mutationFn: async (variables) => await integrationsUpdate(variables),
});

export const useIntegrationsDelete = createMutation<
  APIResponse<Integration>,
  IntegrationDeleteDto
>({
  mutationKey: ["integrations", "delete"],
  mutationFn: async (variables) => await integrationsDelete(variables),
});
