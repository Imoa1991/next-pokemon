import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronsUpDown } from "lucide-react";
import { DataTableProps } from "@/types";
import { useRouter } from "next/navigation";

export function DataTable<TData extends { name: string }, TValue>({
  columns,
  data,
  onSort,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  const router = useRouter();
  return (
    <div className="overflow-x-auto rounded-lg shadow-md bg-white">
      <Table className="min-w-full">
        <TableHeader className="bg-gray-100">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className="px-4 py-2 text-left text-sm font-semibold text-gray-600"
                >
                  <div className="flex items-center gap-1">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    {onSort && (
                      <Button
                        variant="ghost"
                        onClick={() => onSort(header.column.id)}
                        className="text-gray-500 hover:text-gray-700 p-1 rounded-md"
                      >
                        <ChevronsUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                className="cursor-pointer hover:bg-gray-50 transition-colors duration-200"
                data-state={row.getIsSelected() && "selected"}
                onClick={
                  () => router.push(`/pokemon/${row.original.name}`)
                  // window.open(`/pokemon/${row.original.name}`, "_blank")
                }
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className="px-4 py-3 text-sm text-gray-700 border-b"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-24 text-center text-gray-500"
              >
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
