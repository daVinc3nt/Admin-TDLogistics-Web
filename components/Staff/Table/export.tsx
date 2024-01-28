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
    <section className=" mt-3 ml-3">
      <div className="container">
        <h1 className="mb-6 text-3xl font-bold">Nhân Viên</h1>
        <DataTable columns={columns} data={data} />
      </div>
    </section>
  );
}
