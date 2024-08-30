"use client";

import React from "react";
import { Button } from "./ui/button";
import {
  Archive,
  CircleDollarSign,
  Clipboard,
  Layout,
  Menu,
  SlidersHorizontal,
  User,
} from "lucide-react";
import { useSidebarStore } from "@/stores/sidebar/provider";
import { cn } from "@/lib/utils";
import SidebarLink from "./SidebarLink";

function Sidebar() {
  const { toggleSidebar, open } = useSidebarStore((state) => state);

  const sidebarClassNames = `fixed flex flex-col ${
    !open ? "w-0 md:w-16" : "w-72 md:w-64"
  } bg-white transition-all duration-300 overflow-hidden h-full shadow-md z-50`;
  return (
    <div className={sidebarClassNames}>
      <div className="flex gap-3 justify-between md:justify-normal items-center pt-8">
        <div>logo</div>
        <h1
          className={cn("font-extrabold text-2xl", open ? "block" : "hidden")}
        >
          Lapstock
        </h1>
        <Button
          variant="outline"
          onClick={toggleSidebar}
          size="icon"
          className="md:hidden px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100"
        >
          <Menu className="w-4 h-4" />
        </Button>
      </div>
      <div className="flex-grow mt-8">
        <SidebarLink
          href="/dashboard"
          icon={Layout}
          label="Dashboard"
          open={open}
        />
        <SidebarLink
          href="/inventory"
          icon={Archive}
          label="Inventory"
          open={open}
        />
        <SidebarLink
          href="/products"
          icon={Clipboard}
          label="Products"
          open={open}
        />
        <SidebarLink href="/users" icon={User} label="Users" open={open} />
        <SidebarLink
          href="/settings"
          icon={SlidersHorizontal}
          label="Settings"
          open={open}
        />
        <SidebarLink
          href="/expenses"
          icon={CircleDollarSign}
          label="Expenses"
          open={open}
        />
      </div>
      <div className={`${!open ? "hidden" : "block"} mb-10`}>
        <p className="text-center text-xs text-gray-500">
          &copy; 2024 Lapstock
        </p>
      </div>
    </div>
  );
}

export default Sidebar;
