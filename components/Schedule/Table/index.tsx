import { useEffect, useState } from "react";
import { Student } from "./types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter
} from "./table";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { columns } from "./columns";
import { FooterCell } from "./FooterCell";
import useStudents from "./useStudents";

export const Schedule = () => {
  const { data: originalData, isValidating, addRow, updateRow, deleteRow } = useStudents();
  const [data, setData] = useState<Student[]>([]);
  const [editedRows, setEditedRows] = useState({});
  const [validRows, setValidRows] = useState({});

  useEffect(() => {
    if (isValidating) return;
    setData([...originalData]);
  }, [isValidating]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    enableRowSelection: true,
    meta: {
      editedRows,
      setEditedRows,
      validRows,
      setValidRows,
      revertData: (rowIndex: number) => {
        setData((old) =>
          old.map((row, index) =>
            index === rowIndex ? originalData[rowIndex] : row
          )
        );
      },
      updateRow: (rowIndex: number) => {
        updateRow(data[rowIndex].id, data[rowIndex]);
      },
      updateData: (rowIndex: number, columnId: string, value: string, isValid: boolean) => {
        setData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex],
                [columnId]: value,
              };
            }
            return row;
          })
        );
        setValidRows((old) => ({
          ...old,
          [rowIndex]: { ...old[rowIndex], [columnId]: isValid },
        }));
      },
      addRow: () => {
        const id = Math.floor(Math.random() * 10000);
        const newRow: Student = {
          id,
          studentNumber: id,
          name: "",
          dateOfBirth: "",
          major: ""
        };
        addRow(newRow);
      },
      removeRow: (rowIndex: number) => {
        deleteRow(data[rowIndex].id);
      },
      removeSelectedRows: (selectedRows: number[]) => {
        selectedRows.forEach((rowIndex) => {
          deleteRow(data[rowIndex].id);
        });
      },
    },
  });

  return (
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
              className={`border-gray-700 ${row.getIsSelected()? 'bg-gray-700':''}`}
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
      <TableFooter>
        <tr>
          <th colSpan={table.getCenterLeafColumns().length} align="right">
            <FooterCell table={table} />
          </th>
        </tr>
      </TableFooter>
    </Table>
  </div>
  );
};
