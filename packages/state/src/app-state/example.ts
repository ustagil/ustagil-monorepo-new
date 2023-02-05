import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

interface ExampleFormState {
  example: string

  setExample: (data: { example: string }) => void
}

export const useStoreFormRegisterCorporate = create<ExampleFormState>()(
  immer(set => ({
    example: '',

    setExample: input => set(input),
  })),
)

export const accountSelector = (state: ExampleFormState) => ({
  example: state.example,
})
