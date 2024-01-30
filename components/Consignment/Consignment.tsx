import React from "react";
import { useState, useEffect } from "react";
import DemoPage from "./Table/export";
const LoadingSkeleton = () => {
  return <div className="p-3">Đang tải dữ liệu...</div>;
};
const ConsignmentMenu = () => {
  const [demoPage, setDemoPage] = useState(<LoadingSkeleton />);

  useEffect(() => {
    const fetchDemoPage = async () => {
      const result = await DemoPage();
      setDemoPage(result);
    };

    fetchDemoPage();
  }, []);
  return (
    <div className="h-[calc(100vh-3rem)] w-full bg-gray-100 content-center overflow-y-hidden flex flex-col">
      <div className="h-full  items-center w-full left-0 right-0 overflow-y-scroll ">
        <section className="p-2 flex justify-center">
        <div className="container shadow-sm bg-white rounded-xl px-3">
          <div className="relative text-3xl font-bold border-b-[1px] border-gray-300">
            <div className="text-black font-semibold text-xl pt-3 pb-2">Lô hàng</div>
          </div>
          {demoPage}
        </div>
      </section>
      </div>
    </div>
  );
};

export default ConsignmentMenu;
