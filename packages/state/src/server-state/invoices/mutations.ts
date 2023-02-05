import { invoicesCreate, invoicesDelete, invoicesUpdate } from '@acme/api'
import {
  APIResponse,
  Invoice,
  InvoiceCreateDto,
  InvoiceDeleteDto,
  InvoiceUpdateDto,
} from '@acme/typings'
import { createMutation } from 'react-query-kit'

export const useInvoicesCreate = createMutation<
  APIResponse<Invoice>,
  InvoiceCreateDto
>({
  mutationKey: ['invoices', 'create'],
  mutationFn: async variables => await invoicesCreate(variables),
})

export const useInvoicesUpdate = createMutation<
  APIResponse<Invoice>,
  InvoiceUpdateDto
>({
  mutationKey: ['invoices', 'update'],
  mutationFn: async variables => await invoicesUpdate(variables),
})

export const useInvoicesDelete = createMutation<
  APIResponse<Invoice>,
  InvoiceDeleteDto
>({
  mutationKey: ['invoices', 'delete'],
  mutationFn: async variables => await invoicesDelete(variables),
})
