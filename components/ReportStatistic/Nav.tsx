import React, { useState } from "react";
import Overview from "./OverView";
import Distribution from "./Distribution";
import Performance from "./Performenta";
import { motion, Variants } from "framer-motion";
import DateInput from "./TimeDropDown2";
import { FormattedMessage } from "react-intl";
const App = () => {
  const [view, setView] = useState("overview");
  const [isOpen, setIsOpen] = useState(false);
  const leftSideVariant: Variants = {
    initial: { x: -50, opacity: 0 },
    enter: { x: 0, opacity: 1 },
    exit: { x: -20, opacity: 0 },
  };

  const rightSideVariant: Variants = {
    initial: { x: 50, opacity: 0 },
    enter: { x: 0, opacity: 1 },
    exit: { x: -20, opacity: 0 },
  };
  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  const renderView = () => {
    switch (view) {
      case "overview":
        return <Overview />;
      case "distribution":
        return <Distribution />;
      case "performance":
        return <Performance />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="w-full ">
      <motion.div
        variants={leftSideVariant}
        initial="initial"
        animate="enter"
        exit="exit"
        transition={{ duration: 0.5 }}
        className="font-sans text-black antialiased rounded-xl"
      >
        <nav className="justify-between flex-wrap bg-white p-6 rounded-xl ">
          <div className="flex justify-between  flex-shrink-0 text-black mr-6">
            <span className="font-semibold text-2xl tracking-tight">
              <FormattedMessage id="ReportStatistics.title" />
            </span>
            <div className="block lg:hidden">
              <button
                onClick={toggleNav}
                className="flex items-center px-3 py-2 border rounded text-black border-teal-400 hover:text-red-500 focus:text-red-500 hover:border-white"
              >
                <svg
                  className="fill-current h-3 w-3"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Menu</title>
                  <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                </svg>
              </button>
            </div>
          </div>

          <div
            className={` z-10 mt-2  w-5/6 block flex-grow lg:flex lg:items-center lg:w-auto ${
              isOpen ? "" : "hidden"
            }`}
          >
            <div className="text-base lg:flex-grow bg-white  block rounded-xl text-gray-500">
              {/* Your buttons go here */}
              <button
                onClick={() => setView("overview")}
                className="rounded-xl block mt-4 z-10 lg:inline-block lg:mt-0  hover:text-red-500 focus:text-red-500 focus:underline focus:underline-offset-4 mr-4"
              >
                <FormattedMessage id="ReportStatistics.option1" />
              </button>
              <button
                onClick={() => setView("distribution")}
                className="rounded-xl block mt-4 z-10 lg:inline-block lg:mt-0  hover:text-red-500 focus:text-red-500 focus:underline focus:underline-offset-4 mr-4"
              >
                <FormattedMessage id="ReportStatistics.option2" />
              </button>
              <button
                onClick={() => setView("performance")}
                className="rounded-xl block mt-4 z-10 lg:inline-block lg:mt-0  hover:text-red-500 focus:text-red-500 focus:underline focus:underline-offset-4 mr-4"
              >
                <FormattedMessage id="ReportStatistics.option3" />
              </button>
            </div>
          </div>
        </nav>
      </motion.div>
      <motion.div
        variants={leftSideVariant}
        initial="initial"
        animate="enter"
        exit="exit"
        transition={{ duration: 0.5 }}
      >
        <div className="text-black font-semibold text-sm ml-6 border-d border mr-6  ">
          <div className="mt-5">
            <p>
              <FormattedMessage id="ReportStatistics.time" />
            </p>
            <DateInput />
          </div>
          {/* <div className="mt-5">
            <p>Nhân viên</p>
            <input
              className="shadow appearance-none border rounded w-full  px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline py-3"
              type="text"
              placeholder={"Tất cả nhân viên"}
            />
          </div>
          <div className="mt-5">
            <p>Dịch vụ</p>
            <input
              className="shadow appearance-none border rounded w-full  px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline py-3"
              type="text"
              placeholder={"Tất cả dịch vụ"}
            />
          </div> */}
        </div>
        <div
          className=" mt-2
          h-screen_1/3
          xxs:h-screen_1/3
          xs:h-screen_2/5
          s:h-screen_1/2
          sm:h-screen_1/2
          md:h-screen_3/5
          lg:h-screen_3/5
          xl:h-screen_3/5
          2xl:h-screen_4/5
          3xl:h-screen_4/5
          mb-2
          "
        >
          {renderView()}
        </div>
      </motion.div>
    </div>
  );
};

export default App;
