import {
  IntegrationEmailCheckDto,
  IntegrationEmailCheckIntegrationDto,
} from "@ustagil/typing";
import {
  integrationEmailsCheck,
  integrationEmailsCheckIntegration,
} from "@ustagil/web-api";
import { createMutation } from "react-query-kit";

export const useIntegrationEmailsCheck = createMutation<
  number,
  IntegrationEmailCheckDto
>({
  mutationKey: ["integration-emails", "check"],
  mutationFn: async (variables) => await integrationEmailsCheck(variables),
});

export const useIntegrationEmailsCheckIntegration = createMutation<
  number,
  IntegrationEmailCheckIntegrationDto
>({
  mutationKey: ["integration-emails", "check-integration"],
  mutationFn: async (variables) =>
    await integrationEmailsCheckIntegration(variables),
});
