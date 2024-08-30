"use client";

import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { ChangeEventHandler } from "react";

function SearchBar() {
  const router = useRouter();
  const queryParams = useSearchParams();

  const onColumnFiltersChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const newSearchParams = new URLSearchParams(queryParams);
    newSearchParams.set("q", e.target.value);
    router.replace(`?${newSearchParams.toString()}`);
  };

  return (
    <div className="mb-6">
      <div className="flex items-center border-2 border-gray-200 rounded">
        <SearchIcon className="w-5 h-5 text-gray-500 m-2" />
        <Input
          className="w-full py-2 px-4 rounded bg-white"
          placeholder="Search products..."
          onChange={onColumnFiltersChange}
        />
      </div>
    </div>
  );
}

export default SearchBar;
