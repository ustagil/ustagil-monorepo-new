import { integrationEmailsAddGet } from '@acme/api'
import { APIResponse, IntegrationEmailGetNewDto } from '@acme/typings'
import { createQuery } from 'react-query-kit'

export const useIntegrationEmailsGetNew = createQuery<
  APIResponse<string>,
  IntegrationEmailGetNewDto
>({
  primaryKey: 'integration emails get new',
  queryFn: async ({ queryKey: [_, variables] }) =>
    await integrationEmailsAddGet(variables),
})
