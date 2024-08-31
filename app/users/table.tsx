"use client";

import { DataTable } from "@/components/data-table/data-table";
import { useDataTable } from "@/hooks/use-data-table";
import { UsersDTO } from "@/types/users";
import React from "react";
import { getColumns } from "./columns";

type Props = {
  data: UsersDTO[];
};

function Table({ data }: Props) {
  const columns = React.useMemo(() => getColumns(), []);
  const { table } = useDataTable({
    data,
    columns,
    pageCount: 1,
    defaultPerPage: Math.ceil(data.length / 10) * 10,
  });
  return <DataTable className="shadow mt-5" table={table}></DataTable>;
}

export default Table;
