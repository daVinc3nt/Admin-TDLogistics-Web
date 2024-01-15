import React from "react";
import { HelpContact } from "../Icons";
import { FormattedMessage } from "react-intl";
const HelpQuick = () => {
  return (
    <div className=" my-5 flex">
      <HelpContact className="w-20  mt-5" />
      <div className="mt-5 mx-5">
        <h1 className="text-2xl font-semibold text-gray-600">
          <FormattedMessage id="Helpcenter.quickhelp.title" />
          <p className="font-normal text-sm text-gray-500 mt-5">
            <FormattedMessage id="Helpcenter.quickhelp.detail" />
          </p>
        </h1>

        <button
          className="
            font-medium text-sm mt-5 py-2 px-6 rounded bg-red-500 text-white "
        >
          <span>
            <FormattedMessage id="Helpcenter.quickhelp.button" />
          </span>
        </button>
      </div>
    </div>
  );
};

export default HelpQuick;
