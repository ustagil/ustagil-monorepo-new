import {
  integrationEmailsCheck,
  integrationEmailsCheckIntegration,
} from '@acme/api'
import {
  IntegrationEmailCheckDto,
  IntegrationEmailCheckIntegrationDto,
} from '@acme/typings'
import { createMutation } from 'react-query-kit'

export const useIntegrationEmailsCheck = createMutation<
  number,
  IntegrationEmailCheckDto
>({
  mutationKey: ['integration-emails', 'check'],
  mutationFn: async variables => await integrationEmailsCheck(variables),
})

export const useIntegrationEmailsCheckIntegration = createMutation<
  number,
  IntegrationEmailCheckIntegrationDto
>({
  mutationKey: ['integration-emails', 'check-integration'],
  mutationFn: async variables =>
    await integrationEmailsCheckIntegration(variables),
})
