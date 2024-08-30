"use client";

import { PropsWithChildren } from "react";
import { SidebarStoreProvider } from "./sidebar/provider";
import { ThemeStoreProvider } from "./theme/provider";

export default function StoreProvider({ children }: PropsWithChildren<{}>) {
  return (
    <ThemeStoreProvider>
      <SidebarStoreProvider>{children}</SidebarStoreProvider>
    </ThemeStoreProvider>
  );
}
