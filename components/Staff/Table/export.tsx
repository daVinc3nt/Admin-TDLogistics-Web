import { LeakAddTwoTone } from "@mui/icons-material";
import { Staff, columns } from "./column";
import { DataTable } from "./datatable";
import { useEffect } from "react";
import { StaffsOperation, FindingStaffByAdminConditions } from "@/TDLib/tdlogistics";
import https from "https";
const conditions: FindingStaffByAdminConditions[] = [];
async function getData(info:any): Promise<any> {
  // Fetch data from your API here.p
  const validValues = ['ADMIN', 'TELLER', 'HUMAN_RESOURCE_MANAGER', 'COMPLAINTS_SOLVER', 'AGENCY_MANAGER', 'AGENCY_HUMAN_RESOURCE_MANAGER'];
  const role = info?.role
  const staff = new StaffsOperation()
  console.log(info)
  let res
  if (role === "ADMIN" || 
      role === "HUMAN_RESOURCE_MANAGER" ||
      role === "COMPLAINTS_SOLVER" ||
      role === "AGENCY_MANAGER" ||
      role === "AGENCY_HUMAN_RESOURCE_MANAGER")
    {
      res = await staff.findByAdmin(conditions[0])  
    }
  const res1 = await fetch(
    "https://65a8eb68219bfa371867ef13.mockapi.io/fakeapi/staff"
  );
  // const data = await res.json();
  // console.log(res1)
  // console.log(data)
  // console.log(res1)
  console.log(res.data)
  
  return res.data;
}

export default async function DemoPage(info:any) {
  console.log(info)
  const data = await getData(info);

  return <DataTable columns={columns} data={data} />;
}
