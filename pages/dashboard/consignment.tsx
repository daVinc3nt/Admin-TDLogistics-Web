import ConsignmentMenu from "@/components/Consignment/Consignment";
import type { NextPage } from "next";
const Consignment: NextPage = () => {
  return (
    <div className="w-full no-scrollbar">
      <ConsignmentMenu />
    </div>
  );
};

export default Consignment;
