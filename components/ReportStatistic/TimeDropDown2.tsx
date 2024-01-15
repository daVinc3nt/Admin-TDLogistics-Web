import React, { useState } from "react";
import { FormattedMessage } from "react-intl";
const DateInput = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div>
        <label
          htmlFor="start-date"
          className="block text-sm font-medium text-gray-700"
        >
          <FormattedMessage id="ReportStatistics.time1" />
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
          <FormattedMessage id="ReportStatistics.time2" />
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
      <button
        type="submit"
        className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
      >
        <FormattedMessage id="ReportStatistics.timebutton" />
      </button>
    </form>
  );
};

export default DateInput;
