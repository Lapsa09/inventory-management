import { type SQL } from "drizzle-orm";

export type SearchParams =
  | string
  | string[][]
  | URLSearchParams
  | Record<string, string>
  | undefined;

export interface Option {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
  withCount?: boolean;
}

export interface DataTableFilterField<TData> {
  label: string;
  value: keyof TData;
  placeholder?: string;
  options?: Option[];
}

export interface DataTableFilterOption<TData> {
  id: string;
  label: string;
  value: keyof TData;
  options: Option[];
  filterValues?: string[];
  filterOperator?: string;
  isMulti?: boolean;
}

export type DrizzleWhere<T> =
  | SQL<unknown>
  | ((aliases: T) => SQL<T> | undefined)
  | undefined;

export type UserSetting = {
  label: string;
  value: string | boolean;
  type: "text" | "toggle";
};
