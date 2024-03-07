import { useState } from "react";
import { Task } from '@/components/Types'
import { columns } from "./column";
import { DataTable } from "./datatable";
import {getRequest}from "@/components/UseData";
import useData from "@/components/UseData";
async function get() {
  const data = await getRequest();
  // originalData có giá trị ở đây
  return data;
}

export default async function DemoPage() {
  const data = await get()
  return (
    <DataTable columns={columns} originalData={data} />
  );
}
