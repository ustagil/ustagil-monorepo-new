import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

interface IntegrationEmailState {
  integrationEmail: string | undefined
  selectedApp: string | undefined

  setIntegrationEmail: (data: string) => void
  setSelectedApp: (data: string) => void
}

export const useIntegrationEmailStore = create<IntegrationEmailState>()(
  immer(set => ({
    integrationEmail: undefined,
    selectedApp: undefined,

    setIntegrationEmail: data => set({ integrationEmail: data }),
    setSelectedApp: data => set({ selectedApp: data }),
  })),
)
