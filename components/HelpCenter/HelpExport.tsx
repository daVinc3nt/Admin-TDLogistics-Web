import React from "react";
import HelpOther from "./HelpOther";
import HelpProblem from "./HelpProblem";
import HelpQuick from "./HelpQuick";
import classNames from "classnames";
import { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import { FormattedMessage, useIntl, IntlShape } from "react-intl";

const Data = "Nguyễn Văn A";
const HelpExport = () => {
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
  const [toggleCollapse, setToggleCollapse] = useState(false);
  const collapseIconClasses = classNames(
    "-bottom-2 lg:-bottom-6 p-2 lg:p-4 rounded bg-light-lighter hover:bg-gray-300 absolute left-0",
    {
      "rotate-180": toggleCollapse,
    }
  );
  const handleOrderFormToggle = () => {
    setToggleCollapse(!toggleCollapse);
  };
  const wrapperClasses = classNames(
    "relative bottom-0 px-4 pt-10 pb-4 bg-light flex justify-between flex-col rounded-2xl",
    {
      "h-[calc(100vh-3rem)] w-full ": !toggleCollapse,
      "w-16 lg:w-20 h-[calc(4rem)] lg:h-[calc(5rem)]": toggleCollapse,
      "@media (min-width: 1152px)": {
        "w-full": !toggleCollapse,
      },
    }
  );
  const [toggleCollapse2, setToggleCollapse2] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    timer = setTimeout(() => {
      setToggleCollapse2(toggleCollapse);
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [toggleCollapse]);
  return (
    <div className=" h-[calc(100vh-3rem)] w-full bg-gradient-to-b from-gray-100 to-gray-300  content-center  overflow-y-scroll ">
      <motion.div
        variants={leftSideVariant}
        initial="initial"
        animate="enter"
        exit="exit"
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-tr from-white to-white h-20 flex place-content-start rounded-xl"
      >
        <p
          className="self-center 
                text-lg
                xl:text-2xl 
                font-semibold
                text-black mx-5 rounded-xl"
        >
          <FormattedMessage id="Helpcenter.title.welcome" />
          <span className="text-red-500 font-extrabold ">{Data}</span>,
          <FormattedMessage id="Helpcenter.title.script" />
        </p>
      </motion.div>
      <motion.div
        variants={leftSideVariant}
        initial="initial"
        animate="enter"
        exit="exit"
        transition={{ duration: 0.5 }}
        className="my-5 flex place-items-center 
      "
      >
        <div className="flex flex-col gap-5 place-items-center">
          <div className="bg-gradient-to-tr from-white to-slate-100 rounded-lg w-11/12">
            <HelpOther />
          </div>
          <div className="bg-gradient-to-tr from-white to-slate-100 rounded-lg w-11/12">
            <HelpProblem />
          </div>
          <div className="bg-gradient-to-tr from-white to-slate-100 rounded-lg w-11/12">
            <HelpQuick />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HelpExport;
