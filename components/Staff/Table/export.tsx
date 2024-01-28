import { Staff, columns } from "./column";
import { DataTable } from "./datatable";
import https from "https";

async function getData(): Promise<Staff[]> {
  // Fetch data from your API here.

  const res = await fetch(
    "https://65a8eb68219bfa371867ef13.mockapi.io/fakeapi/staff"
  );
  const data = await res.json();
  return data;
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <section className="">
      <div className="container">
        <div className=" text-3xl font-bold pl-3 py-3 shadow-sm bg-gradient-to-r from-cyan-500 to-blue-500">
          <div className="text-white">Nhân viên</div>
        </div>
        <DataTable columns={columns} data={data} />
      </div>
    </section>
  );
}
