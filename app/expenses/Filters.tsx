"use client";

import CustomSelect from "@/components/Select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSearchParams, useRouter } from "next/navigation";
import React, { ChangeEventHandler } from "react";

const CATEGORIES = [
  {
    value: "office",
    label: "Office",
  },
  {
    value: "professional",
    label: "Professional",
  },
  {
    value: "salaries",
    label: "Salaries",
  },
  {
    value: "all",
    label: "All",
    defaultChecked: true,
  },
];

const classNames = {
  label: "block text-sm font-medium text-gray-700",
  selectInput:
    "mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md",
};

function Filters() {
  const router = useRouter();
  const queryParams = useSearchParams();

  const onColumnFiltersChange: ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement
  > = (e) => {
    const newSearchParams = new URLSearchParams(queryParams);
    newSearchParams.set(e.target.name, e.target.value);
    router.replace(`?${newSearchParams.toString()}`);
  };

  const onColumnSelectFiltersChange = (value: string, name: string) => {
    const newSearchParams = new URLSearchParams(queryParams);
    newSearchParams.set(name, value);
    router.replace(`?${newSearchParams.toString()}`);
  };

  return (
    <div className="w-full md:w-1/3 bg-white shadow rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">
        Filter by Category and Date
      </h3>
      <div className="space-y-4">
        {/* CATEGORY */}
        <div>
          <Label htmlFor="category" className={classNames.label}>
            Category
          </Label>
          <CustomSelect
            name="category"
            options={CATEGORIES}
            defaultValue={"all"}
            onValueChange={(value) =>
              onColumnSelectFiltersChange(value, "category")
            }
          />
        </div>
        {/* START DATE */}
        <div>
          <Label htmlFor="startDate" className={classNames.label}>
            Start Date
          </Label>
          <Input
            type="date"
            id="startDate"
            name="startDate"
            className={classNames.selectInput}
            onChange={onColumnFiltersChange}
          />
        </div>
        {/* END DATE */}
        <div>
          <Label htmlFor="endDate" className={classNames.label}>
            End Date
          </Label>
          <Input
            type="date"
            id="endDate"
            name="endDate"
            className={classNames.selectInput}
            onChange={onColumnFiltersChange}
          />
        </div>
      </div>
    </div>
  );
}

export default Filters;
