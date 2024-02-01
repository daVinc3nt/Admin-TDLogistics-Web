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
import { Input } from "./input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
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
              id="consSearch"
              type="text"
              value={
                (table.getColumn("consignmentCode")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("consignmentCode")?.setFilterValue(event.target.value)
              }
              className={`peer h-10 self-center w-full border border-gray-600 rounded focus:outline-none focus:border-blue-500 truncate bg-transparent
                    text-left placeholder-transparent pl-3 pt-2 pr-12 text-sm text-white`}
              placeholder=""
            />
            <label
              htmlFor="consSearch"
              className={`absolute left-3 -top-0 text-xxs leading-5 text-white transition-all 
                    peer-placeholder-shown:text-sm peer-placeholder-shown:text-white peer-placeholder-shown:top-2.5 
                    peer-focus:-top-0.5 peer-focus:leading-5 peer-focus:text-blue-500 peer-focus:text-xxs`}
            >
              Tìm kiếm theo mã lô hàng
            </label>
          </div>
          <Dropdown className="z-30">
            <DropdownTrigger>
              <Button
                className="text-xs md:text-base border border-gray-600 rounded ml-2 w-24 text-center"
                aria-label="Show items per page"
              >
                Show {table.getState().pagination.pageSize}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              className="bg-[#1a1b23] border border-gray-300 rounded w-24"
              aria-labelledby="dropdownMenuButton"
            >
              {[10, 20, 30, 40, 50].map((pageSize, index) => (
                <DropdownItem key={pageSize} textValue={`Show ${pageSize} items per page`}>
                  <Button
                    onClick={() => table.setPageSize(pageSize)}
                    variant="bordered"
                    aria-label={`Show ${pageSize}`}
                    className="text-center  text-white w-full"
                  >
                    Show {pageSize}
                  </Button>
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      <div className="rounded-md border border-gray-700">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-gray-700">
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
                  className="border-gray-700"
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
          className="px-2 py-[0.15rem] mb-0.5 w-12 sm:w-16 bg-transparent 
          drop-shadow-md hover:drop-shadow-xl hover:bg-opacity-30 hover:text-white border border-white hover:bg-black
          hover:shadow-md md:text-base focus:outline-none font-normal
          text-white rounded-md text-sm text-center me-2"
        >
          <span>Prev</span>
        </Button>
        <span className="flex items-center gap-1">
          <div className="text-xs md:text-base">Page</div>
          <strong className="text-xs md:text-base whitespace-nowrap">
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </strong>
        </span>
        <TbMinusVertical className="text-xl text-gray-700" />
        <span className="flex items-center gap-1 text-xs md:text-base whitespace-nowrap">
          Go to page:
          <input
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className="border border-gray-500 px-1 py-0.5 rounded w-8 sm:w-16 bg-transparent"
          />
        </span>
        <Button
          variant="light"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="px-2 py-[0.15rem] mb-0.5 w-12 sm:w-16 bg-transparent 
          drop-shadow-md hover:drop-shadow-xl hover:bg-opacity-30 hover:text-white border border-white hover:bg-black
          hover:shadow-md md:text-base focus:outline-none font-normal
          text-white rounded-md text-sm text-center me-2"
        >
          <span>Next</span>
        </Button>
      </div>
    </div>
  );
}
