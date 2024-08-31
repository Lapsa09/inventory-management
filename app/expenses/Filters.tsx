"use client";

import { DatePicker } from "@/components/DatePicker";
import CustomSelect from "@/components/Select";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { useSearchParams, useRouter } from "next/navigation";
import React from "react";

const CATEGORIES = [
  {
    value: "Office",
    label: "Office",
  },
  {
    value: "Professional",
    label: "Professional",
  },
  {
    value: "Salaries",
    label: "Salaries",
  },
  {
    value: "All",
    label: "All",
    defaultChecked: true,
  },
];

function Filters() {
  const router = useRouter();
  const queryParams = useSearchParams();

  const onColumnSelectFiltersChange = (name: string, value: string) => {
    const newSearchParams = new URLSearchParams(queryParams);
    newSearchParams.set(name, value);
    router.replace(`?${newSearchParams.toString()}`);
  };

  const onColumnDateFiltersChange = (name: string, date?: Date) => {
    const newSearchParams = new URLSearchParams(queryParams);
    if (date) newSearchParams.set(name, format(date, "yyyy-MM-dd"));
    else newSearchParams.delete(name);
    console.log(date);
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
          <Label htmlFor="category">Category</Label>
          <CustomSelect
            name="category"
            options={CATEGORIES}
            defaultValue={"All"}
            onValueChange={(value) =>
              onColumnSelectFiltersChange("category", value)
            }
          />
        </div>
        {/* START DATE */}
        <div>
          <Label htmlFor="startDate">Start Date</Label>
          <DatePicker
            id="startDate"
            name="startDate"
            date={queryParams.get("startDate")}
            setDate={(date) => onColumnDateFiltersChange("startDate", date)}
          />
        </div>
        {/* END DATE */}
        <div>
          <Label htmlFor="endDate">End Date</Label>
          <DatePicker
            id="endDate"
            name="endDate"
            date={queryParams.get("endDate")}
            setDate={(date) => onColumnDateFiltersChange("endDate", date)}
          />
        </div>
      </div>
    </div>
  );
}

export default Filters;
