"use client";

import React, { PropsWithChildren } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/stores/sidebar/provider";
import { useThemeStore } from "@/stores/theme/provider";

type Props = {};

function DashboardWrapper({ children }: PropsWithChildren<Props>) {
  const { open } = useSidebarStore((state) => state);
  const { theme } = useThemeStore((state) => state);
  return (
    <div
      className={cn("flex bg-gray-50 text-gray-900 w-full min-h-screen", theme)}
    >
      <Sidebar />
      <main
        className={cn(
          `flex flex-col w-full h-full py-7 px-9 bg-gray-50 ${
            !open ? "md:pl-24" : "md:pl-72"
          }`,
          theme
        )}
      >
        <Navbar />
        {children}
      </main>
    </div>
  );
}

export default DashboardWrapper;
