import { mergeQueryKeys } from '@lukemorales/query-key-factory'
import { integrationEmails } from './integration-emails'
import { integrations } from './integrations'
import { invoices } from './invoices'
import { todos } from './todos'

export * from './auth'
export * from './integration-emails'
export * from './integrations'
export * from './invoices'
export * from './todos'

export const queries = mergeQueryKeys(
  integrations,
  invoices,
  integrationEmails,
  todos,
)
