"use client";
import React from "react";
import { TbMinusVertical } from "react-icons/tb";
import {
  ColumnDef,
  SortingState,
  flexRender,
  ColumnFiltersState,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { Input } from "../ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });
  const paginationButtons = [];
  for (let i = 0; i < table.getPageCount(); i++) {
    paginationButtons.push(
      <Button key={i} onClick={() => table.setPageIndex(i)}>
        {i + 1}
      </Button>
    );
  }

  return (
    <div>
      <div className="flex items-center py-4">
        <div className="w-full flex">
          <div className="relative w-full sm:w-1/2 lg:w-1/3">
            <Input
                  type="text"
                  value={
                    (table.getColumn("staffKey")?.getFilterValue() as string) ?? ""
                  }
                  onChange={(event) =>
                    table.getColumn("staffKey")?.setFilterValue(event.target.value)
                  }
                  className={`peer h-10 self-center w-full border border-gray-300 rounded focus:outline-none focus:border-blue-500 truncate bg-black
                        text-left placeholder-transparent pl-3 pt-2 text-black pr-12 text-sm`}
                  placeholder=""
                />
            <label
              className={`absolute left-3 -top-0 text-xxs leading-5 text-gray-600 transition-all 
                    peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-700 peer-placeholder-shown:top-2.5 
                    peer-focus:-top-0.5 peer-focus:leading-5 peer-focus:text-blue-500 peer-focus:text-xxs`}
            >
              Tìm kiếm theo mã lô hàng
            </label>
          </div>
          <Dropdown className="z-30">
            <DropdownTrigger>
              <Button className="text-xs md:text-base border border-gray-300 rounded ml-2 w-24 text-center">Show {table.getState().pagination.pageSize}</Button>
            </DropdownTrigger>
            <DropdownMenu
              className="bg-white border border-gray-300 rounded w-24">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <DropdownItem
                  key={pageSize}
                  onClick={() => table.setPageSize(pageSize)}
                  className={`text-xs md:text-base text-center ${pageSize == 50? '':'border-b'}`}
                >
                  <Button className="" 
                  variant="bordered">Show {pageSize}</Button>
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>   
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-center space-x-2 py-4">
        <Button
          variant="light"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="px-2 py-[0.15rem] mb-0.5 w-16 bg-transparent 
          drop-shadow-md hover:drop-shadow-xl hover:text-white border border-gray-700 hover:bg-red-500
          hover:shadow-md md:text-base focus:outline-none focus:ring-red-300 font-normal hover:border-red-500
          text-gray-700 focus:ring-4 rounded-md text-sm text-center me-2">
          <span>Prev</span>
        </Button>
        <span className="flex items-center gap-1">
          <div className="text-xs md:text-base">Page</div>
          <strong className="text-xs md:text-base">
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </strong>
        </span>
        <TbMinusVertical className="text-xl text-gray-700"/>
        <span className="flex items-center gap-1 text-xs md:text-base">
          Go to page:
          <input
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className="border px-1 py-0.5 rounded w-16"
          />
        </span>
        <Button
          variant="light"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="px-2 py-[0.15rem] mb-0.5 w-16 bg-transparent 
          drop-shadow-md hover:drop-shadow-xl hover:text-white border border-gray-700 hover:bg-red-500
          hover:shadow-md md:text-base focus:outline-none focus:ring-red-300 font-normal hover:border-red-500
          text-gray-700 focus:ring-4 rounded-md text-sm text-center me-2"
        >
          <span>Next</span>
        </Button>
      </div>
    </div>
  );
}
