"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { LogoIcon, UsersIcon } from "@/components/Icons";
import DetailNoti from "./detailNoti";
// Đảm bảo gọi hàm này ở đầu ứng dụng của bạn
export type Staff = {
  number: string;
  staffName: string;
  staffAccountName: string;
  staffKey: string;
  staffRole: string;
  staffPhone: string;
  staffKPI: number;
  staffSalary: number;
  staffSalaryPaid: number;
  staffDeposit: number;
};

export const columns: ColumnDef<Staff>[] = [
  {
    accessorKey: "number",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          STT
          <ArrowUpDown className="ml-2 h-4 w-4"/>
        </Button>
      );
    },
  },
  {
    accessorKey: "staffKey",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Mã lô hàng
          <ArrowUpDown className="ml-2 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "staffName",

    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nhân viên vận chuyển
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "staffKey",

    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Đối tác vận chuyển
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "staffKey",

    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Khối lượng
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "staffKey",

    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Trạng thái
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
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
      const [modalIsOpen, setModalIsOpen] = useState(false);

      const openModal = () => {
        setModalIsOpen(true);
      };

      const closeModal = () => {
        setModalIsOpen(false);
      };

      return (
        <div className="relative flex justify-end mr-2">
          <Button
            onClick={openModal}
            className="bg-transparent hover:bg-black text-black font-semibold hover:text-white py-1 px-[0.65rem] border border-gray-900 hover:border-transparent rounded-full"
          >
            +
          </Button>
          {modalIsOpen && <DetailNoti onClose={closeModal}/>}
        </div>
      );
    },
  },
];
