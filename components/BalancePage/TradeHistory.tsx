import React, { useState } from "react";
import { format, addDays, addMonths, addYears } from "date-fns";
import MultichoiceDropdown from "./MultichoiceDropdown";
import SinglechoiceDropdown from "./SinglechoiceDropdown";

interface HistoryInfo {
  type: number;
  date: string;
  income: number;
}

const TradeHistory: React.FC = () => {
  const [sortTypes, setSortTypes] = useState<number[]>([]);
  const [timeRange, setTimeRange] = useState<string>("");

  const exampleHistory: HistoryInfo[] = [
    // { type: 0, date: '3/5/2022 11:44:17', income: 115250 },
    // { type: 4, date: '11/14/2009, 4:06:38', income: 289920 },
    // { type: 0, date: '8/25/2022 0:27:20', income: 276968 },
    // { type: 1, date: '11/14/2009, 4:06:38', income: 152961 },
    // { type: 3, date: '11/7/2022 21:53:33', income: 211846 },
    // { type: 4, date: '11/14/2009, 4:06:38', income: 18163 },
    // { type: 0, date: '5/8/2023 20:58:54', income: 2761 },
    // { type: 3, date: '11/14/2009, 4:06:38', income: 179788 },
    // { type: 1, date: '2/23/2023 21:55:56', income: 129948 },
    // { type: 2, date: '6/17/2022 11:14:0', income: 279060 },
    // { type: 4, date: '6/16/2023 10:22:53', income: 240391 },
    // { type: 2, date: '10/16/2022 19:39:42', income: 293853 },
    // { type: 3, date: '11/14/2009, 4:06:38', income: 153996 },
    // { type: 2, date: '2/21/2023 13:6:56', income: 173903 },
    // { type: 2, date: '11/14/2009, 4:06:38', income: 161030 },
    // { type: 0, date: '9/20/2023 4:27:2', income: 198447 },
    // { type: 4, date: '11/14/2009, 4:06:38', income: 24898 },
    // { type: 3, date: '11/14/2009, 4:06:38', income: 296691 },
    // { type: 0, date: '9/4/2022 9:46:41', income: 45067 },
    // { type: 2, date: '11/14/2009, 4:06:38', income: 65781 },
    // { type: 1, date: '4/21/2022 9:7:49', income: 85656 },
    // { type: 2, date: '11/14/2009, 4:06:38', income: 29967 },
    // { type: 3, date: '3/6/2023 8:27:6', income: 157472 },
    // { type: 1, date: '9/5/2022 3:51:5', income: 68073 },
    // { type: 4, date: '11/14/2009, 4:06:38', income: 53016 },
    // { type: 4, date: '11/14/2009, 4:06:38', income: 14273 },
    // { type: 3, date: '1/12/2022 21:39:46', income: 30151 },
    // { type: 3, date: '11/18/2022 8:7:19', income: 297259 },
    // { type: 1, date: '8/13/2023 10:39:9', income: 183887 },
    // { type: 0, date: '11/14/2009, 4:06:38', income: 169383 },
    // { type: 2, date: '9/5/2023 21:26:9', income: 43802 },
    // { type: 2, date: '3/1/2022 14:42:19', income: 207104 },
    // { type: 1, date: '11/14/2009, 4:06:38', income: 73542 },
    // { type: 3, date: '1/10/2022 8:59:41', income: 296086 },
    // { type: 2, date: '9/16/2023 13:39:15', income: 247677 },
    // { type: 1, date: '12/25/2022 23:41:15', income: 270690 },
    // { type: 3, date: '6/10/2022 0:0:7', income: 124890 },
    // { type: 3, date: '2/8/2022 19:19:50', income: 191260 },
    // { type: 4, date: '11/14/2009, 4:06:38', income: 263692 },
    // { type: 0, date: '5/22/2022 5:9:36', income: 61072 },
    // { type: 4, date: '5/21/2023 22:4:4', income: 139444 },
    // { type: 0, date: '11/14/2009, 4:06:38', income: 108600 },
    // { type: 2, date: '7/11/2022 15:0:12', income: 107463 },
    // { type: 2, date: '1/25/2023 20:29:43', income: 277137 },
    // { type: 4, date: '11/14/2009, 4:06:38', income: 88820 },
    // { type: 0, date: '7/23/2022 0:58:42', income: 3240522 },
    // { type: 2, date: '8/3/2023 9:36:20', income: 36461 },
    // { type: 2, date: '11/14/2009, 4:06:38', income: 240639 },
    // { type: 1, date: '12/15/2022 8:44:48', income: 14956 },
    // { type: 4, date: '12/9/2023 11:8:7', income: 289610 },
    // { type: 1, date: '3/3/2023 8:2:25', income: 79007 },
    // { type: 2, date: '4/12/2023 16:6:15', income: 202636 },
    // { type: 3, date: '10/2/2022 15:16:58', income: 191368 },
    // { type: 2, date: '6/5/2022 12:18:28', income: 56552 },
    // { type: 0, date: '12/10/2023 23:31:48', income: 21522 },
    // { type: 0, date: '11/27/2023 3:30:6', income: 167484 },
    // { type: 3, date: '4/2/2022 11:35:13', income: 292542 },
    // { type: 4, date: '6/3/2022 0:59:10', income: 254407 },
    // { type: 1, date: '11/14/2009, 4:06:38', income: 223425 },
    // { type: 1, date: '9/18/2022 18:37:45', income: 259058 },
    // { type: 1, date: '3/9/2022 16:6:57', income: 261363 },
    // { type: 2, date: '11/14/2009, 4:06:38', income: 269504 },
    // { type: 4, date: '11/14/2009, 4:06:38', income: 223283 },
    // { type: 4, date: '5/6/2022 18:51:0', income: 52569 },
    // { type: 3, date: '6/11/2022 5:34:58', income: 92292 },
    // { type: 3, date: '4/16/2022 7:52:53', income: 243088 },
    // { type: 0, date: '5/18/2023 2:22:31', income: 9544 },
    // { type: 1, date: '4/5/2023 3:53:29', income: 237880 },
    // { type: 4, date: '3/12/2022 8:28:2', income: 180019 },
    // { type: 2, date: '11/5/2023 5:39:45', income: 95064 },
    // { type: 0, date: '12/3/2022 9:49:26', income: 254651 },
    // { type: 1, date: '11/14/2009, 4:06:38', income: 151461 },
    // { type: 2, date: '11/14/2009, 4:06:38', income: 177686 },
    // { type: 2, date: '1/17/2022 10:31:52', income: 8457 },
    // { type: 2, date: '3/18/2023 15:53:50', income: 2361 },
    // { type: 1, date: '11/14/2009, 4:06:38', income: 69281 },
    // { type: 4, date: '6/1/2022 2:21:47', income: 244671 },
    // { type: 2, date: '11/14/2009, 4:06:38', income: 9799 },
    // { type: 4, date: '11/14/2009, 4:06:38', income: 222441 },
    // { type: 4, date: '9/28/2023 1:6:10', income: 279760 },
    // { type: 4, date: '4/27/2023 18:32:44', income: 7382 },
    // { type: 2, date: '11/14/2009, 4:06:38', income: 1794 },
    // { type: 0, date: '11/28/2022 17:4:22', income: 249347 },
    // { type: 4, date: '3/24/2022 9:41:12', income: 297570 },
    // { type: 3, date: '11/14/2009, 4:06:38', income: 27790 },
    // { type: 4, date: '12/1/2022 9:59:12', income: 124749 },
    // { type: 1, date: '5/21/2023 20:45:18', income: 183078 },
    // { type: 4, date: '6/26/2023 6:36:54', income: 282529 },
    // { type: 3, date: '2/2/2023 1:59:31', income: 74369 },
    // { type: 0, date: '11/14/2009, 4:06:38', income: 171423 },
    // { type: 1, date: '11/7/2022 9:30:17', income: 270246 },
    // { type: 0, date: '2/10/2022 11:48:13', income: 54216 },
    // { type: 2, date: '10/13/2022 3:57:10', income: 68158 },
    // { type: 2, date: '01/11/2024 3:57:10', income: 68158 },
    // { type: 4, date: '1/4/2022 8:42:2', income: 90075 },
    // { type: 3, date: '6/3/2023 1:3:13', income: 195118 },
    // { type: 2, date: '11/14/2009, 4:06:38', income: 120082 },
    // { type: 0, date: '11/14/2009, 4:06:38', income: 24117 },
    // { type: 1, date: '10/19/2022 16:35:32', income: 213627 },
    // { type: 4, date: '11/14/2009, 4:06:38', income: 87882 },
    // { type: 2, date: '9/14/2023 5:33:26', income: 167300 }
  ];

  const filterAndSortHistory = (history: HistoryInfo[]): HistoryInfo[] => {
    let filteredHistory = history;

    // Filter by type
    if (sortTypes.length > 0) {
      filteredHistory = filteredHistory.filter((entry) => sortTypes.includes(entry.type));
    }

    // Filter by time range
    const currentDate = new Date();
    switch (timeRange) {
      case "today":
        filteredHistory = filteredHistory.filter((entry) => {
          const entryDate = new Date(entry.date);
          return (
            entryDate.getDate() === currentDate.getDate() &&
            entryDate.getMonth() === currentDate.getMonth() &&
            entryDate.getFullYear() === currentDate.getFullYear()
          );
        });
        break;
      case "7days":
        filteredHistory = filteredHistory.filter((entry) => {
          const entryDate = new Date(entry.date);
          return entryDate.getTime() >= addDays(currentDate, -7).getTime();
        });
        break;
      case "1month":
        filteredHistory = filteredHistory.filter((entry) => {
          const entryDate = new Date(entry.date);
          return entryDate.getTime() >= addMonths(currentDate, -1).getTime();
        });
        break;
      case "1year":
        filteredHistory = filteredHistory.filter((entry) => {
          const entryDate = new Date(entry.date);
          return entryDate.getTime() >= addYears(currentDate, -1).getTime();
        });
        break;
      // "all" case is handled by not applying any additional filtering
      default:
        break;
    }

    // Sort by date
    const sortedHistory = filteredHistory.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateB - dateA;
    });

    return sortedHistory;
  };

  const getTypeLabel = (type: number): string => {
    switch (type) {
      case 0:
        return "Nhận tiền";
      case 1:
        return "Nạp tiền";
      case 2:
        return "Hoàn tiền";
      case 3:
        return "Rút tiền";
      case 4:
        return "Thanh toán";
      default:
        return "Không xác định";
    }
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const formattedDate = format(date, "HH:mm:ss | dd/MM/yyyy");
    return formattedDate;
  };

  return (
    <div className="relative grow rounded-b-xl flex flex-col-reverse overflow-y-auto">
      <div className="relative w-full overflow-y-scroll rounded-b-xl no-scrollbar grow z-0">
        {filterAndSortHistory(exampleHistory).length > 0 ? (
          filterAndSortHistory(exampleHistory).map((entry, index) => (
            <div key={index} className={`grid grid-cols-2 sm:grid-cols-3 h-14 ${index == 0? '':'border-t-[1px]'}  border-gray-300`}>
              <div className="px-6 py-4 whitespace-nowrap">
                {getTypeLabel(entry.type)}
              </div>
              <div className="px-6 py-4 hidden sm:block whitespace-nowrap text-center">
                {formatDate(entry.date)}
              </div>
              <div
                className={`px-6 py-4 whitespace-nowrap text-right ${
                  entry.type <= 2 ? "text-green-500" : "text-red-500"
                }`}
              >
                {entry.type <= 2 ? "+" : "-"}
                {new Intl.NumberFormat("vi-VN", {
                  currency: "VND",
                }).format(entry.income)}{" "}
                ₫
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-4 text-gray-500">
            Không có lịch sử giao dịch
          </div>
        )}
      </div>
      <div className="w-full divide-y divide-gray-200">
          <div className="flex flex-1 sticky top-0 bg-white border-b-[1px] border-gray-300">
            <div className="px-6 py-3 w-1/2 lg:w-1/3 text-left text-xs font-medium text-gray-500 uppercase tracking-widers">
              <MultichoiceDropdown
                name="Loại"
                options={["Nhận tiền", "Nạp tiền", "Hoàn tiền", "Rút tiền", "Thanh toán"]}
                selectedOptions1={sortTypes.map(String)}
                setSelectedOptions1={(selectedOptions) => setSortTypes(selectedOptions.map(Number))}
              />
            </div>
            <div className="px-6 py-3 text-left w-1/3 text-xs font-medium text-gray-500 uppercase flex justify-center">
              <SinglechoiceDropdown
                name="Thời gian"
                options={[
                  { label: "Tất cả", value: "all" },
                  { label: "Hôm nay", value: "today" },
                  { label: "7 ngày qua", value: "7days" },
                  { label: "1 tháng qua", value: "1month" },
                  { label: "1 năm qua", value: "1year" },
                ]}
                selectedOption={timeRange}
                setSelectedOption={(selectedOption) => setTimeRange(selectedOption)}
              />
            </div>
            <div
              className="w-1/2 lg:w-1/3 mt-1 xs:mt-2 pr-6 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider text-right"
            >
              Biến động số dư
            </div>
          </div>
      </div>
    </div>
  );
};

export default TradeHistory;
