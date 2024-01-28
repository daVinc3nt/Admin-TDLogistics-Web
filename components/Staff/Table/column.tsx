"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { LogoIcon, UsersIcon } from "@/components/Icons";
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
          ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
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
          Staff Name
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
          Staff Key
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "staffRole",

    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Staff Role
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "Detail",
    cell: ({ row }) => {
      const [modalIsOpen, setModalIsOpen] = useState(false);

      const openModal = () => {
        setModalIsOpen(true);
      };

      const closeModal = () => {
        setModalIsOpen(false);
      };

      return (
        <div className="relative rounded-lg ">
          <Button
            onClick={openModal}
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          >
            Xem chi tiết
          </Button>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Thông tin chi tiết nhân viên"
          >
            <div>
              <LogoIcon className=" w-12 h-12" />
              <div className="absolute top-0 right-0">
                <button
                  className="bg-red-500 text-white w-12 h-8"
                  onClick={closeModal}
                >
                  Đóng
                </button>
              </div>

              <div className="grid grid-cols-2 mt-4">
                {/* Hiển thị thông tin chi tiết của nhân viên ở đây */}
                {/* Ví dụ: */}
                <div>
                  <div className="font-bold text-lg ">Ảnh đại diện</div>
                  <UsersIcon className=" w-12 h-12" />
                </div>
                <div>
                  <p className=" font-bold text-lg">
                    Thông tin chi tiết nhân viên :
                  </p>
                  <p>-Staff ID: {row.original.number}</p>
                  <p>-Staff Name: {row.original.staffName}</p>
                  <p>-Staff AccountName: {row.original.staffAccountName}</p>
                  <p>-Staff Key: {row.original.staffKey}</p>
                  <p>-Staff Role: {row.original.staffRole}</p>
                  <p>-Staff KPI: {row.original.staffKPI}</p>
                  <p>-Staff Salary: {row.original.staffSalary}</p>
                  <p>-Staff SalaryPaid: {row.original.staffSalaryPaid}</p>
                  <p>-Staff Deposit: {row.original.staffDeposit}</p>
                </div>
              </div>
            </div>
          </Modal>
        </div>
      );
    },
  },
];
