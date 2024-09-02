"use client";

import { PropsWithChildren } from "react";
import { SidebarStoreProvider } from "./sidebar/provider";

export default function StoreProvider({ children }: PropsWithChildren<{}>) {
  return <SidebarStoreProvider>{children}</SidebarStoreProvider>;
}
