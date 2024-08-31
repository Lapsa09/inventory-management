import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { ProductDTO } from "@/types/products";
import { ColumnDef } from "@tanstack/react-table";

export function getColumns(): ColumnDef<ProductDTO>[] {
  return [
    {
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Id" />
      ),
      accessorKey: "productId",
    },
    {
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Name" />
      ),
      accessorKey: "name",
    },
    {
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Price" />
      ),
      accessorFn: (row) =>
        Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(+row.price),
      id: "price",
    },
    {
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Rating" />
      ),
      accessorKey: "rating",
    },
    {
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Stock" />
      ),
      accessorKey: "stockQuantity",
    },
  ];
}
