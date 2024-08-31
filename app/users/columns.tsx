import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { UsersDTO } from "@/types/users";
import { ColumnDef } from "@tanstack/react-table";

export function getColumns(): ColumnDef<UsersDTO>[] {
  return [
    {
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Id" />
      ),
      accessorKey: "userId",
    },
    {
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Name" />
      ),
      accessorKey: "name",
    },
    {
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Email" />
      ),
      accessorKey: "email",
    },
  ];
}
