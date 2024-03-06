import { columns } from "./column";
import { DataTable } from "./datatable";
import https from "https";
import {
  TransportPartnersOperation,
  FindingTransportPartnerByAdminConditions,
} from "@/TDLib/tdlogistics";

const service = new TransportPartnersOperation();
const coditions: FindingTransportPartnerByAdminConditions[] = [];

async function getData(): Promise<any> {
  const response = await service.findByAdmin(coditions[0]);
  // console.log(response);
  return response.data;
}

export default async function DemoPage() {
  const data = await getData();
  return <DataTable columns={columns} data={data} />;
}
