"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import DetailNoti from "../LoadingSkeleton/detailNoti";

interface Order {
  orderId: string;
  mass: number;
  length: number;
  width: number;
  height: number;
  pickupLocation: string;
  deliveryLocation: string;
  fee: number;
  cod: number;
  status: number;
}

export type Consignment = {
  consignmentCode: string;
  barcode: string;
  deliveryManName: string;
  licensePlate: string;
  container: string;
  consState: number;
  consCode: string;
  carrierName: string;
  mass: number;
  id: number;
};
export const columns: ColumnDef<Consignment>[] = [
  {
    accessorKey: "number",
    header: ({ column }) => {
      return (
        <Button
          className="rounded-xl px-1"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          STT
          <ArrowUpDown className="ml-2 h-4 w-4"/>
        </Button>
      );
    },
    cell: ({ row }) => {
      // The index will be used to generate sequential numbers starting from 1
      const index = row.index + 1;

      return (
        <span className={`bg-gray-500 text-gray-500 animate-pulse rounded`}>{index}</span>  
      );
    },
  },
  {
    accessorKey: "consignmentCode",
    header: ({ column }) => {
      return (
        <Button
          className="rounded-xl px-1"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Mã lô hàng
          <ArrowUpDown className="ml-2 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return ( <span className={`bg-gray-600 text-gray-600 animate-pulse rounded`}>{row.original.consignmentCode}</span>  
      );
    },
  },
  {
    accessorKey: "deliveryManName",

    header: ({ column }) => {
      return (
        <Button
          className="rounded-xl px-1"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nhân viên vận chuyển
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return ( <span className={`bg-gray-500 text-gray-500 animate-pulse rounded`}>{row.original.deliveryManName}</span>  
      );
    },
  },
  {
    accessorKey: "carrierName",

    header: ({ column }) => {
      return (
        <Button
          className="rounded-xl px-1"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Đối tác vận chuyển
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return ( <span className={`bg-gray-600 text-gray-600 animate-pulse rounded`}>{row.original.carrierName}</span>  
      );
    },
  },
  {
    accessorKey: "mass",

    header: ({ column }) => {
      return (
        <Button
          className="rounded-xl px-1"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Khối lượng (kg)
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return ( <span className={`bg-gray-500 text-gray-500 animate-pulse rounded`}>{row.original.mass}</span>  
      );
    },
  },
  {
    accessorKey: "consState",
    header: ({ column }) => {
      return (
        <Button
          className="rounded-xl px-1"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Trạng thái
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const consState = row.original.consState;
      let statusLabel = "";

      switch (consState) {
        case 1:
          statusLabel = "Đang vận chuyển";
          break;
        case 2:
          statusLabel = "Đang lấy hàng";
          break;
        case 3:
          statusLabel = "Đã giao";
          break;
        case 4:
          statusLabel = "Đã hủy";
          break;
        default:
          statusLabel = "Unknown";
      }

      return ( <span className={`bg-gray-600 text-gray-600 animate-pulse rounded`}>{statusLabel}</span>  
      );
    },
  },
  {
    accessorKey: "Chi tiết",
    header: () => {
      return (
        <div className="text-right whitespace-nowrap">Chi tiết</div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="relative flex justify-end mr-2">
          <Button
            className="bg-transparent hover:bg-white font-bold hover:text-black py-1 px-[0.65rem] border border-gray-600 hover:border-transparent rounded-full"
          >
            +
          </Button>
        </div>
      );
    },
  },
];
