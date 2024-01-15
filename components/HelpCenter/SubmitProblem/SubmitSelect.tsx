import React from "react";
import { useState, useEffect } from "react";
import { UploadIcon } from "../../Icons";
import { FormattedMessage, useIntl } from "react-intl";

const SubmitSelect = () => {
  const intl = useIntl();
  const placeholderText = intl.formatMessage({
    id: "Helpcenter.title.inlink.placeholder",
  });

  const [select, setSelect] = useState("AS");
  return (
    <div>
      <div className="mt-5">
        <label
          htmlFor="countries"
          className="block  text-sm   text-black font-semibold"
        >
          <FormattedMessage id="Helpcenter.title.inlink.selectproblem.title" />
        </label>
        <select
          id="countries"
          className=" text-gray-900 text-sm rounded-lg  block w-full p-1 
            "
          onChange={(e) => setSelect(e.target.value)}
          value={select}
        >
          <option value="AS">
            <FormattedMessage id="Helpcenter.title.inlink.selectproblem.problem1" />
          </option>
          <option value="IR">
            <FormattedMessage id="Helpcenter.title.inlink.selectproblem.problem2" />
          </option>
          <option value="GR">
            <FormattedMessage id="Helpcenter.title.inlink.selectproblem.problem3" />
          </option>
          <option value="AI">
            <FormattedMessage id="Helpcenter.title.inlink.selectproblem.problem4" />
          </option>
          <option value="OT">
            <FormattedMessage id="Helpcenter.title.inlink.selectproblem.problem5" />
          </option>
        </select>
      </div>
      <div className="mt-5">
        {select === "AS" && (
          <div>
            <label
              htmlFor="countries"
              className="block  text-sm   text-black font-semibold"
            >
              <FormattedMessage id="Helpcenter.title.inlink.selectyourproblem.title" />
            </label>
            <select
              id="countries"
              className=" text-gray-900 text-sm rounded-lg  block w-full p-1 "
            >
              <option value="AS1">
                <FormattedMessage id="Helpcenter.title.inlink.selectyourproblem.inproblem1.script1" />
              </option>
              <option value="AS2">
                <FormattedMessage id="Helpcenter.title.inlink.selectyourproblem.inproblem1.script2" />
              </option>
              <option value="AS3">
                <FormattedMessage id="Helpcenter.title.inlink.selectyourproblem.inproblem1.script3" />
              </option>
              <option value="AS4">
                <FormattedMessage id="Helpcenter.title.inlink.selectyourproblem.inproblem1.script4" />
              </option>
            </select>
          </div>
        )}
        {select === "IR" && (
          <div>
            <label
              htmlFor="countries"
              className="block  text-sm   text-black font-semibold"
            >
              <FormattedMessage id="Helpcenter.title.inlink.selectyourproblem.title" />
            </label>
            <select
              id="countries"
              className=" text-gray-900 text-sm rounded-lg  block w-full p-1 "
            >
              <option value="IR">
                <FormattedMessage id="Helpcenter.title.inlink.selectyourproblem.inproblem2.script1" />
              </option>
              <option value="GR">
                <FormattedMessage id="Helpcenter.title.inlink.selectyourproblem.inproblem2.script2" />
              </option>
              <option value="AI">
                <FormattedMessage id="Helpcenter.title.inlink.selectyourproblem.inproblem2.script3" />
              </option>
            </select>
          </div>
        )}
        {select === "GR" && (
          <div>
            <label
              htmlFor="countries"
              className="block  text-sm   text-black font-semibold"
            >
              <FormattedMessage id="Helpcenter.title.inlink.selectyourproblem.title" />
            </label>
            <select
              id="countries"
              className=" text-gray-900 text-sm rounded-lg  block w-full p-1 "
            >
              <option value="GR">
                <FormattedMessage id="Helpcenter.title.inlink.selectyourproblem.inproblem3.script1" />
              </option>
              <option value="AI">
                <FormattedMessage id="Helpcenter.title.inlink.selectyourproblem.inproblem3.script2" />
              </option>
            </select>
          </div>
        )}
        {select === "AI" && (
          <div>
            <label
              htmlFor="countries"
              className="block  text-sm   text-black font-semibold"
            >
              <FormattedMessage id="Helpcenter.title.inlink.selectyourproblem.title" />
            </label>
            <select
              id="countries"
              className=" text-gray-900 text-sm rounded-lg  block w-full p-1 "
            >
              <option value="AI">
                <FormattedMessage id="Helpcenter.title.inlink.selectyourproblem.inproblem4.script1" />
              </option>
              <option value="AI">
                <FormattedMessage id="Helpcenter.title.inlink.selectyourproblem.inproblem4.script2" />
              </option>
            </select>
          </div>
        )}
        {select === "OT" && (
          <div>
            <label
              htmlFor="countries"
              className="block  text-sm   text-black font-semibold"
            >
              <FormattedMessage id="Helpcenter.title.inlink.selectyourproblem.title" />
            </label>
            <select
              id="countries"
              className=" text-gray-900 text-sm rounded-lg  block w-full p-1 "
            >
              <option value="OT">
                <FormattedMessage id="Helpcenter.title.inlink.selectyourproblem.inproblem5.script1" />
              </option>
            </select>
          </div>
        )}
      </div>
      <div className="mt-5">
        <h1 className="text-sm   text-black font-semibold">
          <FormattedMessage id="Helpcenter.title.inlink.Box" />
        </h1>
        <div>
          <textarea
            className="w-full h-32 p-1 border border-gray-300 rounded-lg text-gray-900 text-sm focus:outline-none focus:border-indigo-500"
            placeholder={placeholderText}
          ></textarea>
        </div>
      </div>
      <div className="mt-5">
        <h1 className="text-sm text-red font-semibold">
          <FormattedMessage id="Helpcenter.title.inlink.Photo" />
        </h1>
        <div className="mt-5">
          <input
            type="file"
            className=" text-gray-900"
            id="upload"
            style={{ display: "none" }}
          />
          <label
            htmlFor="upload"
            className="flex items-center text-red-500 cursor-pointer border border-red-500 rounded-lg px-7 py-2 w-52 "
          >
            <UploadIcon />
            <span className="ml-4">
              <FormattedMessage id="Helpcenter.title.inlink.Photo1" />
            </span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default SubmitSelect;
