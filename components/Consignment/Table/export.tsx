import { Staff, columns } from "./column";
import { DataTable } from "./datatable";

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
      <DataTable columns={columns} data={data} />
  );
}
