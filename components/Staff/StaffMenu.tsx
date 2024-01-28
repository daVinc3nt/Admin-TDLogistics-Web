import React from "react";
import { useState, useEffect } from "react";
import DemoPage from "./Table/export";
const LoadingSkeleton = () => {
  return <div>Đang tải dữ liệu</div>;
};
const StaffMenu = () => {
  const [demoPage, setDemoPage] = useState(<LoadingSkeleton />);

  useEffect(() => {
    const fetchDemoPage = async () => {
      const result = await DemoPage();
      setDemoPage(result);
    };

    fetchDemoPage();
  }, []);
  return (
    <div className="h-[calc(100vh-3rem)] w-full bg-gradient-to-b from-gray-100 to-gray-300 content-center overflow-y-hidden  rounded-lg flex flex-col">
      <div className="bg-white h-full  items-center w-full left-0 right-0 overflow-y-scroll round-lg">
        {demoPage}
      </div>
    </div>
  );
};

export default StaffMenu;
