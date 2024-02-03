"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import DetailNoti from "./detailNoti";
import { Checkbox } from "@/components/TableUI/checkbox"

export type Order = {
  orderId: string;
  mass: number;
  length: number;
  width: number;
  height: number;
  pickupLocation: string;
  deliveryLocation: string;
  fee: number;
  cod: number;
  consCodes: number;
  status: number;
}
export const columns: ColumnDef<Order>[] = [
//select
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() ? "indeterminate" : false)
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
//number
  {
    accessorKey: "number",
    header: ({ column }) => {
      return (
        <Button
          className="rounded"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          STT
          <ArrowUpDown className="ml-2 h-4 w-4"/>
        </Button>
      );
    },
    cell: ({ row }) => {
      const index = row.index + 1;
      return (
        <>{index}</>
      );
    },
  },
//orderid
  {
    accessorKey: "orderId",
    header: ({ column }) => {
      return (
        <Button
          className="rounded"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Mã đơn hàng
          <ArrowUpDown className="ml-2 w-4" />
        </Button>
      );
    },
  },
//pickuplocation
  {
    accessorKey: "pickupLocation",

    header: ({ column }) => {
      return (
        <Button
          className="rounded"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Điểm nhận
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
//deliveryLocation
{
  accessorKey: "deliveryLocation",

  header: ({ column }) => {
    return (
      <Button
        className="rounded"
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Điểm nhận
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    );
  },
},
//mass
  {
    accessorKey: "mass",

    header: ({ column }) => {
      return (
        <Button
          className="rounded"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Khối lượng (kg)
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
// status
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          className="rounded"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Trạng thái
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const consState = row.original.status;
      let statusLabel = "";
      let statusColor = "";

      switch (consState) {
        case 1:
          statusLabel = "Đang vận chuyển";
          statusColor = "text-yellow-600";
          break;
        case 2:
          statusLabel = "Đang lấy hàng";
          statusColor = "text-gray-700";
          break;
        case 3:
          statusLabel = "Đã giao";
          statusColor = "text-green-500";
          break;
        case 4:
          statusLabel = "Đã hủy";
          statusColor = "text-red-500";
          break;
        default:
          statusLabel = "Unknown";
      }

      return (
        <span className={statusColor}>{statusLabel}</span>
      );
    },
  },
//detail
  {
    accessorKey: "Chi tiết",
    header: () => {
      return (
        <div className="text-right whitespace-nowrap">Chi tiết</div>
      );
    },
    cell: ({ row }) => {
      const [modalIsOpen, setModalIsOpen] = useState(false);

      const openModal = () => {
        setModalIsOpen(true);
        console.log(row.original)
      };

      const closeModal = () => {
        setModalIsOpen(false);
      };

      return (
        <div className="relative flex justify-end mr-2">
          <Button
            onClick={openModal}
            className="bg-transparent hover:bg-white font-bold hover:text-black py-1 px-[0.65rem] border border-gray-600 hover:border-transparent rounded-full"
          >
            +
          </Button>
          {modalIsOpen && <DetailNoti onClose={closeModal} dataInitial={row.original}/>}
        </div>
      );
    },
  },
];
