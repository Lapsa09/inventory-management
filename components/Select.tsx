"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectProps, SelectTriggerProps } from "@radix-ui/react-select";

type Props = SelectProps &
  SelectTriggerProps & {
    options: {
      value: string;
      label: string;
      defaultChecked?: boolean;
    }[];
  };

function CustomSelect({
  options,
  defaultValue,
  name,
  onValueChange,
  className,
}: Props) {
  return (
    <Select
      name={name}
      onValueChange={onValueChange}
      defaultValue={defaultValue}
    >
      <SelectTrigger className={className}>
        <SelectValue placeholder="Select" />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            defaultChecked={option.defaultChecked}
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default CustomSelect;
