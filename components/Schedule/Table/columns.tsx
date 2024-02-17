import { createColumnHelper } from '@tanstack/react-table'
import { TableCell } from './TableCell'
import { Task } from '@/components/types'
import { ArrowUpDown} from "lucide-react";
import { EditCell } from './EditCell'
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@nextui-org/react";
const columnHelper = createColumnHelper<Task>()

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "taskId",
    header: ({ column }) => {
      return (
        <Button
          className="rounded"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
          <ArrowUpDown className="ml-2 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "description",

    header: ({ column }) => {
      return (
        <Button
          className="rounded"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Description
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "priority",
    header: ({ column }) => {
      return (
        <Button
          className="rounded"
          variant="ghost"
          onClick={() => {column.toggleSorting(column.getIsSorted() === "asc"); console.log("hello")}}
        >
          Priority
          <ArrowUpDown className="ml-2 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "status",

    header: ({ column }) => {
      return (
        <Button
          className="rounded"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const State = row.original.status;
      let statusLabel = "";
      let statusColor = "";
      if (State)
      {
        statusLabel = "Done";
        statusColor = "text-green-500";
      }
      else 
      {
        statusLabel = "On going";
        statusColor = "text-gray-500";
      }
      return (
        <span className={statusColor}>{statusLabel}</span>
      );
    },
  },
  {
    accessorKey: "deadline",
    meta: {
      type: "date",
    },
    header: ({ column }) => {
      return (
        <Button
          className="rounded"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Deadline
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  columnHelper.display({
    id: 'edit',
    cell: EditCell,
  }),
]
