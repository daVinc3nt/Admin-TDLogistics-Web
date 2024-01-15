import React from "react";
import { useState, useEffect } from "react";
import ProblemExport from "./ProblemMore/ProblemExport";
import { FormattedMessage } from "react-intl";

const HelpProblem = () => {
  const [isShow, setIsShow] = useState(false);
  const [select, setSelect] = useState("Chọn vấn đề của bạn");
  return (
    <div className="mx-5 my-5">
      <h1 className="text-2xl font-semibold text-gray-600">
        <FormattedMessage id="Helpcenter.help.title" />
      </h1>
      <p className="font-normal text-sm text-gray-500 mt-5">
        <FormattedMessage id="Helpcenter.help.script" />
      </p>
      <div className="mt-5 flex flex-wrap-reverse gap-4 ">
        <button
          onClick={() => {
            setIsShow(true), setSelect("Price");
          }}
          className="text-blue-500 hover:text-sky-700 font-medium text-sm "
        >
          <span>
            <FormattedMessage id="Helpcenter.help.select.option1" />
          </span>
        </button>
        <button
          onClick={() => {
            setIsShow(true), setSelect("Terms");
          }}
          className="text-blue-500 hover:text-sky-700 font-medium text-sm "
        >
          <span>
            <FormattedMessage id="Helpcenter.help.select.option2" />
          </span>
        </button>
        <button
          onClick={() => {
            setIsShow(true), setSelect("OrderProcess");
          }}
          className="text-blue-500 hover:text-sky-700 font-medium text-sm "
        >
          <span>
            <FormattedMessage id="Helpcenter.help.select.option3" />
          </span>
        </button>
        <button
          onClick={() => {
            setIsShow(true), setSelect("Customer");
          }}
          className="text-blue-500 hover:text-sky-700 font-medium text-sm "
        >
          <span>
            <FormattedMessage id="Helpcenter.help.select.option4" />
          </span>
        </button>
        <button
          onClick={() => {
            setIsShow(true), setSelect("Sale");
          }}
          className="text-blue-500 hover:text-sky-700 font-medium text-sm "
        >
          <span>
            <FormattedMessage id="Helpcenter.help.select.option5" />
          </span>
        </button>
        <button
          onClick={() => {
            setIsShow(true), setSelect("Support");
          }}
          className="text-blue-500 hover:text-sky-700 font-medium text-sm "
        >
          <span>
            <FormattedMessage id="Helpcenter.help.select.option6" />
          </span>
        </button>
        <button
          onClick={() => {
            setIsShow(true), setSelect("Pay");
          }}
          className="text-blue-500 hover:text-sky-700 font-medium text-sm "
        >
          <span>
            <FormattedMessage id="Helpcenter.help.select.option7" />
          </span>
        </button>
      </div>
      {isShow && (
        <ProblemExport onClose={() => setIsShow(false)} select={select} />
      )}
    </div>
  );
};

export default HelpProblem;
