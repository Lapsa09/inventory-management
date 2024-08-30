"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";

import { type SidebarStore, createSidebarStore } from "@/stores/sidebar/store";

export type SidebarStoreApi = ReturnType<typeof createSidebarStore>;

export const SidebarStoreContext = createContext<SidebarStoreApi | undefined>(
  undefined
);

export interface CounterStoreProviderProps {
  children: ReactNode;
}

export const SidebarStoreProvider = ({
  children,
}: CounterStoreProviderProps) => {
  const storeRef = useRef<SidebarStoreApi>();
  if (!storeRef.current) {
    storeRef.current = createSidebarStore({ open: false });
  }

  return (
    <SidebarStoreContext.Provider value={storeRef.current}>
      {children}
    </SidebarStoreContext.Provider>
  );
};

export function useSidebarStore<T>(selector: (store: SidebarStore) => T): T {
  const sidebarStoreContext = useContext(SidebarStoreContext);

  if (!sidebarStoreContext) {
    throw new Error(`useThemeStore must be used within SidebarStoreProvider`);
  }

  return useStore(sidebarStoreContext, selector);
}
