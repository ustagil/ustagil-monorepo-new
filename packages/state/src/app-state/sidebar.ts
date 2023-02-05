import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

interface SidebarState {
  collapsed: boolean

  toggleCollape: () => void
}

export const useStoreSidebar = create<SidebarState>()(
  immer((set, get) => ({
    collapsed: false,

    toggleCollape: () =>
      set({
        collapsed: !get().collapsed,
      }),
  })),
)
