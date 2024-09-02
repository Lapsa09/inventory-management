"use client";

import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type Props = { href: string; icon: LucideIcon; label: string; open: boolean };

function SidebarLink({ href, icon: Icon, label, open }: Props) {
  const pathname = usePathname();
  const isActive =
    pathname === href || (pathname === "/" && href === "/dashboard");
  return (
    <Link href={href}>
      <div
        className={`cursor-pointer flex items-center ${
          !open ? "justify-center py-4" : "justify-start px-8 py-4"
        } hover:text-blue-500 hover:bg-blue-100 gap-3 transition-colors ${
          isActive ? "bg-blue-200 dark:bg-blue-700" : ""
        }`}
      >
        <Icon className="w-6 h-6 " size={24} />
        <span className={`${!open ? "hidden" : "block"} font-medium `}>
          {label}
        </span>
      </div>
    </Link>
  );
}

export default SidebarLink;
