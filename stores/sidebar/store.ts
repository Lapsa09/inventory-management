import { createStore } from "zustand/vanilla";

export type SidebarState = {
  open: boolean;
};

export type SidebarActions = {
  toggleSidebar: () => void;
};

export type SidebarStore = SidebarState & SidebarActions;

export const defaultInitState: SidebarState = {
  open: false,
};

export const createSidebarStore = (
  initState: SidebarState = defaultInitState
) => {
  return createStore<SidebarStore>()((set) => ({
    ...initState,
    toggleSidebar: () =>
      set((state) => ({
        open: !state.open,
      })),
  }));
};
