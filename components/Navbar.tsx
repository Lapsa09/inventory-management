"use client";

import { Bell, Menu, Moon, Settings, Sun } from "lucide-react";
import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Link from "next/link";
import { useThemeStore } from "@/stores/theme/provider";
import { useSidebarStore } from "@/stores/sidebar/provider";
import { cn } from "@/lib/utils";

function Navbar() {
  const { theme, toggleTheme } = useThemeStore((state) => state);
  const { toggleSidebar, open } = useSidebarStore((state) => state);
  return (
    <div className="flex justify-between items-center w-full mb-7">
      <div
        className={cn(
          "flex justify-between items-center gap-5",
          !open ? "px-5" : "px-8"
        )}
      >
        <Button
          variant={"outline"}
          size={"icon"}
          onClick={toggleSidebar}
          className="px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100"
        >
          <Menu className="w-4 h-4" />
        </Button>
        <div className="relative">
          <Input
            type="search"
            placeholder="Start type to search groups & products"
            className="pl-10 pr-4 py-2 w-50 md:w-80 border-2 border-gray-300 bg-white rounded-lg focus-visible:outline-none focus-visible:border-blue-500 focus-visible:ring-0"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Bell className="text-gray-500" size={20} />
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center gap-5">
        <div className="hidden md:flex justify-between items-center gap-5">
          <div>
            <Button onClick={toggleTheme} variant={"ghost"} size={"icon"}>
              {theme === "light" ? (
                <Moon className="cursor-pointer text-gray-500" size={24} />
              ) : (
                <Sun className="cursor-pointer text-gray-500" size={24} />
              )}
            </Button>
          </div>
          <div className="relative">
            <Bell className="cursor-pointer text-gray-500" size={24} />
            <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-[0.4rem] py-1 text-xs font-semibold leading-none text-red-100 bg-red-400 rounded-full">
              3
            </span>
          </div>
          <hr className="w-0 h-7 border border-solid border-l border-gray-300 mx-3" />
          <div className="flex items-center gap-3 cursor-pointer">
            <div className="w-9 h-9">image</div>
            <span className="font-semibold">Lapsa</span>
          </div>
        </div>
        <Link href="/settings">
          <Settings className="cursor-pointer text-gray-500" size={24} />
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
