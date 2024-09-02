"use client";

import React, { PropsWithChildren } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/stores/sidebar/provider";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

type Props = ThemeProviderProps & {};

function DashboardWrapper({ children, ...props }: PropsWithChildren<Props>) {
  const { open } = useSidebarStore((state) => state);
  return (
    <NextThemesProvider {...props}>
      <div className={cn("flex w-full min-h-screen")}>
        <Sidebar />
        <main
          className={cn(
            `flex flex-col w-full h-full py-7 px-9 ${
              !open ? "md:pl-24" : "md:pl-72"
            }`
          )}
        >
          <Navbar />
          {children}
        </main>
      </div>
    </NextThemesProvider>
  );
}

export default DashboardWrapper;
