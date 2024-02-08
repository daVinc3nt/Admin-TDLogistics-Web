"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import { FormattedMessage } from "react-intl";
import DetailVehicle from "./deltaiVehicle";
// Đảm bảo gọi hàm này ở đầu ứng dụng của bạn

export type VehicleData = {
  VehicleName: string;
  VehicleType: string;
  VehicleID: string;
  VehicleStatus: boolean;
  id: string;
};

export const columns: ColumnDef<VehicleData>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <FormattedMessage id="Number" />
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "VehicleName",
    header: ({ column }) => {
      return (
        <div>
          <FormattedMessage id="Vehicle Name" />
        </div>
      );
    },
  },
  {
    accessorKey: "VehicleType",
    header: ({ column }) => {
      return (
        <div>
          <FormattedMessage id="Vehicle Type" />
        </div>
      );
    },
  },
  {
    accessorKey: "VehicleID",
    header: ({ column }) => {
      return (
        <div>
          <FormattedMessage id="Vehicle ID" />
        </div>
      );
    },
  },
  {
    accessorKey: "VehicleStatus",
    header: ({ column }) => {
      return (
        <div>
          <FormattedMessage id="Vehicle Status" />
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div>
          {row.original.VehicleStatus ? (
            <div className="text-green-500">
              <FormattedMessage id="Active" />
            </div>
          ) : (
            <div className="text-red-500">
              <FormattedMessage id="Inactive" />
            </div>
          )}
        </div>
      );
    },
  },

  {
    accessorKey: "Thông tin chi tiết",
    header: ({ column }) => {
      return <FormattedMessage id="Detail" />;
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
        <div className="relative rounded-lg ">
          <Button
            onClick={openModal}
            className="bg-transparent hover:bg-white font-bold hover:text-black py-1 px-[0.65rem] border border-gray-600 hover:border-transparent rounded-full"
          >
            +
          </Button>
          {modalIsOpen && (
            <DetailVehicle onClose={closeModal} dataInitial={row.original} />
          )}
        </div>
      );
    },
  },
];
