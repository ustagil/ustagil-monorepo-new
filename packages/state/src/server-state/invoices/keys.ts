import { createQueryKeys } from '@lukemorales/query-key-factory'

export const invoices = createQueryKeys('invoices', {
  all: null,
  detail: (userId: string) => [userId],
})
