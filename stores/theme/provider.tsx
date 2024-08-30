"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";

import { type ThemeStore, createThemeStore } from "@/stores/theme/store";

export type CounterStoreApi = ReturnType<typeof createThemeStore>;

export const CounterStoreContext = createContext<CounterStoreApi | undefined>(
  undefined
);

export interface CounterStoreProviderProps {
  children: ReactNode;
}

export const ThemeStoreProvider = ({ children }: CounterStoreProviderProps) => {
  const storeRef = useRef<CounterStoreApi>();
  if (!storeRef.current) {
    storeRef.current = createThemeStore({ theme: "light" });
  }

  return (
    <CounterStoreContext.Provider value={storeRef.current}>
      {children}
    </CounterStoreContext.Provider>
  );
};

export function useThemeStore<T>(selector: (store: ThemeStore) => T): T {
  const counterStoreContext = useContext(CounterStoreContext);

  if (!counterStoreContext) {
    throw new Error(`useThemeStore must be used within ThemeStoreProvider`);
  }

  return useStore(counterStoreContext, selector);
}
