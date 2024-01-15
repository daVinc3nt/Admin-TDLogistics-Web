import React from "react";
import Box from "./Box";
import { info } from "console";
import { FormattedMessage } from "react-intl";
const OverView = () => {
  return (
    <div className="text-black ml-4 text-l mr-4 my-4">
      <div className="flex justify-between">
        <div className="ml-0">
          <div className="text-xl font-semibold ">
            <FormattedMessage id="ReportStatistics.overview.index" />
          </div>
        </div>
        <div className="mr-0">
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-2
                                        w-24 h-8 
                                        sm:w-32 sm:h-10 
                                        rounded-full
                                        flex items-center justify-center"
          >
            <span className="text-xs ">
              <FormattedMessage id="ReportStatistics.overview.downloadreport" />
            </span>
          </button>
        </div>
      </div>
      <div>
        <div>
          <FormattedMessage id="ReportStatistics.overview.indexorder" />
        </div>
        <div className="flex flex-wrap ">
          <div className="m-4">
            <Box
              data={{
                text: "Đơn hàng",
                info: "Đơn hàng hoàn thành",
                num: 0,
                percent: 0,
              }}
            />
          </div>
          <div className="m-4">
            <Box
              data={{
                text: "Điểm giao",
                info: "Tổng điểm giao hoàn thành",
                num: 0,
                percent: 0,
              }}
            />
          </div>
          <div className="m-4">
            <Box
              data={{
                text: "Điểm giao thành công",
                info: "Tỷ lệ tổng điểm giao thành công trên tổng đơn hàng",
                num: 0,
                percent: 0,
              }}
            />
          </div>
          <div className="m-4">
            <Box
              data={{
                text: "Điểm giao thất bại",
                info: "Tỷ lệ tổng điểm giao thất bại trên tổng đơn hàng",
                num: 0,
                percent: 0,
              }}
            />
          </div>
        </div>
      </div>
      <div>
        <div>
          <FormattedMessage id="ReportStatistics.overview.indexfin" />
        </div>
        <div className="flex flex-wrap ">
          <div className="m-4">
            <Box
              data={{
                text: "Tổng phí",
                info: "Tổng phí đơn hoàn thành",
                num: 0,
                percent: 0,
              }}
            />
          </div>
          <div className="m-4">
            <Box
              data={{
                text: "Chiết khấu",
                info: "Tổng chiết khấu theo mã giảm giá",
                num: 0,
                percent: 0,
              }}
            />
          </div>
          <div className="m-4">
            <Box
              data={{
                text: "Thanh toán tiền mặt",
                info: "Tổng phí thanh toán bằng tiền mặt",
                num: 0,
                percent: 0,
              }}
            />
          </div>
          <div className="m-4">
            <Box
              data={{
                text: "Thanh toán tài khoản",
                info: "Tổng phí thanh toán bằng tài khoản",
                num: 0,
                percent: 0,
              }}
            />
          </div>
          <div className="m-4">
            <Box
              data={{
                text: "Hình thức thanh toán khác",
                info: "Bao gồm khác hình thức thanh toán không phải tiền mặt và tài khoản",
                num: 0,
                percent: 0,
              }}
            />
          </div>
        </div>
      </div>
      {/* <div>
        <div>Chỉ số khác</div>
        <div className="flex flex-wrap ">
          <div className="m-4">
            <Box
              data={{
                text: "Thu hộ",
                info: "Tổng tiền ứng (COD)",
                num: 0,
                percent: 0,
              }}
            />
          </div>
          <div className="m-4">
            <Box
              data={{
                text: "Phí mỗi điểm giao",
                info: "Chi phí trung bình mỗi điểm giao",
                num: 0,
                percent: 0,
              }}
            />
          </div>
          <div className="m-4">
            <Box
              data={{
                text: "Tổng khoảng cách",
                info: "Tổng khoảng cách các đơn hàng (km)",
                num: 0,
                percent: 0,
              }}
            />
          </div>
          <div className="m-4">
            <Box
              data={{
                text: "Trung bình khoảng cách",
                info: "Trung bình khoảng cách các đơn hàng (km)",
                num: 0,
                percent: 0,
              }}
            />
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default OverView;
