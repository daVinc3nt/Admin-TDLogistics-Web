import React, { useState } from "react";
import { FormattedMessage } from "react-intl";

const TimeDropDown = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
  };
  const [isOpen, setIsOpen] = useState(false);
  const [time, setTime] = useState("");

  const handleApply = () => {
    console.log(`Querying data htmlFor time: ${time}`);
    setIsOpen(false);
  };

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTime(event.target.value);
  };

  return (
    <div className="relative p-4 z-20 ">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="
      bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-2
      w-24 h-8 
      sm:w-32 sm:h-10 
      rounded-full
      flex items-center justify-center
      "
      >
        <span className="text-xs">
          <FormattedMessage id="OrderHistory.time" />
        </span>
      </button>
      {isOpen && (
        <div className="absolute bg-white px-4 py-4 rounded-xl mt-2">
          <form onSubmit={handleSubmit} className="space-y-2 ">
            <div>
              <label
                htmlFor="start-date"
                className="block text-sm font-medium text-gray-700"
              >
                <FormattedMessage id="OrderHistory.time1" />
              </label>
              <input
                type="date"
                id="start-date"
                name="start-date"
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="end-date"
                className="block text-sm font-medium text-gray-700"
              >
                <FormattedMessage id="OrderHistory.time2" />
              </label>
              <input
                type="date"
                id="end-date"
                name="end-date"
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            {startDate > endDate ? (
              <p className="text-red-500">
                <FormattedMessage id="OrderHistory.warning" />
              </p>
            ) : (
              <p></p>
            )}
            <div className="flex justify-center items-center">
              <button
                type="submit"
                className="px-4 py-1 text-white bg-red-500 rounded-xl hover:bg-red-600 "
              >
                <FormattedMessage id="OrderHistory.timebutton" />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default TimeDropDown;
