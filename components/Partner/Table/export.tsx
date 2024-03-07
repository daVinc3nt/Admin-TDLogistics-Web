import { columns } from "./column";
import { DataTable } from "./datatable";
import https from "https";
import {
  TransportPartnersOperation,
  FindingTransportPartnerByAdminConditions,
  FindingTransportPartnerByTransportPartnerCondition,
  StaffsOperation,
} from "@/TDLib/tdlogistics";

const service = new TransportPartnersOperation();
const coditions: FindingTransportPartnerByAdminConditions[] = [];
const coditions2: FindingTransportPartnerByTransportPartnerCondition[] = [];

async function getData(): Promise<any> {
  const staff = new StaffsOperation();
  const res = await staff.getAuthenticatedStaffInfo();
  const isadmin = res.data.role;
  console.log(isadmin);

  if (isadmin === "ADMIN") {
    const response = await service.findByAdmin(coditions[0]);
    console.log("RoleAdmin");
    return response.data;
  } else {
    const response = await service.findByTransportPartner(coditions2[0]);
    console.log(response);
    console.log("RoleTransportPartner");
    return response.data;
  }
}

export default async function DemoPage() {
  const data = await getData();
  return <DataTable columns={columns} data={data} />;
}
