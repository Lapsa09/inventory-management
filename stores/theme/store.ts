import { createStore } from "zustand/vanilla";
import { persist, createJSONStorage } from "zustand/middleware";

export type ThemeState = {
  theme: "light" | "dark";
};

export type ThemeActions = {
  toggleTheme: () => void;
};

export type ThemeStore = ThemeState & ThemeActions;

export const defaultInitState: ThemeState = {
  theme: "light",
};

export const createThemeStore = (initState: ThemeState = defaultInitState) => {
  return createStore<ThemeStore>()(
    persist(
      (set) => ({
        ...initState,
        toggleTheme: () =>
          set((state) => ({
            theme: state.theme === "light" ? "dark" : "light",
          })),
      }),
      {
        name: "theme",
        storage: createJSONStorage(() => localStorage),
      }
    )
  );
};
