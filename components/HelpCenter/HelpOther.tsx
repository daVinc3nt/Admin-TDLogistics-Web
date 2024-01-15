import React from "react";
import SubmitExport from "./SubmitProblem/SubmitExport";
import { FormattedMessage } from "react-intl";
const HelpOther = () => {
  const [isClicked, setIsClicked] = React.useState(false);
  const handleClick = () => {
    setIsClicked(!isClicked);
  };
  return (
    <div className="mx-5 my-5">
      <h1 className="text-2xl font-semibold text-gray-600">
        <FormattedMessage id="Helpcenter.title.OtherProblem" />
      </h1>
      <p className="font-normal text-sm text-gray-500 mt-5">
        <FormattedMessage id="Helpcenter.title.content" />
      </p>
      <button
        onClick={handleClick}
        className="text-blue-500 hover:text-sky-700 font-medium text-sm mt-5"
      >
        <span>
          <FormattedMessage id="Helpcenter.title.link" />
        </span>
      </button>
      {isClicked && <SubmitExport onClose={handleClick} />}
    </div>
  );
};

export default HelpOther;
