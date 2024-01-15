import ReactPaginate from "react-paginate";
import React, { useEffect } from "react";
import DetailMore from "./DetailMore";
import { FormattedMessage } from "react-intl";
// const rows = [
//   { key: "orderId", label: "Order ID" },
//   { key: "customerName", label: "Customer Name" },
//   { key: "orderDate", label: "Order Date" },
//   { key: "totalAmount", label: "Total Amount" },
//   { key: "shippingAddress", label: "Shipping Address" },
// ];

interface Row {
  orderId: string;
  customerName: string;
  orderDate: string;
  totalAmount: number;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  // Status: string;
}

const rowsPerPage = 10;

const DetailOrder = ({ rows }: { rows: Array<Row> }) => {
  const [currentPage, setCurrentPage] = React.useState(0);

  const handlePageClick = ({
    selected: selectedPage,
  }: {
    selected: number;
  }) => {
    const maxPage = Math.floor(rows.length / rowsPerPage);
    if (selectedPage > maxPage) {
      setCurrentPage(maxPage);
    } else {
      setCurrentPage(selectedPage);
    }
  };

  const currentPageData = rows.slice(
    currentPage * rowsPerPage,
    (currentPage + 1) * rowsPerPage
  );

  if (rows.length === 0) {
    return (
      <div>
        <div className="text-black text-xl ml-3 mt-5">
          <FormattedMessage id="OrderHistory.detail.nodata" />
        </div>
      </div>
    );
  }

  const [showDetail, setShowDetail] = React.useState({});

  return (
    <div
      className="content-center mx-5 h-2/6
    "
      key={currentPage}
    >
      <div className="overflow-x-auto jusitfy-center  h-5/6">
        <div className="shadow-lg bg-white rounded-lg w-full  border  ">
          {currentPageData.map((row, index) => (
            <div
              className={` ${
                index % 2 === 0 ? "bg-slate-100" : "bg-slate-300"
              }`}
              key={(row as { customerName: string }).customerName}
            >
              <div className="flex justify-between p-5">
                <div>
                  <p className="ml-3">
                    <strong>
                      <FormattedMessage id="OrderHistory.detail.option1" />:
                    </strong>{" "}
                    {row.orderId} <br />
                    <strong>
                      <FormattedMessage id="OrderHistory.detail.option2" />:
                    </strong>{" "}
                    {row.customerName} <br />
                    <strong>
                      <FormattedMessage id="OrderHistory.detail.option3" />:
                    </strong>{" "}
                    {row.orderDate} <br />
                    <strong>
                      <FormattedMessage id="OrderHistory.detail.option8" />:
                    </strong>{" "}
                    {row.totalAmount} <br />
                    <strong>
                      <FormattedMessage id="OrderHistory.detail.option10" />:
                    </strong>{" "}
                    {`${row.shippingAddress.street}, ${row.shippingAddress.city}, ${row.shippingAddress.state}, ${row.shippingAddress.zipCode}`}{" "}
                    <br />
                    {/* <strong>Trạng thái:</strong> {`${row.Status}`} <br /> */}
                  </p>
                </div>
                <div className="flex ">
                  <button
                    onClick={() =>
                      setShowDetail({ ...showDetail, [row.orderId]: true })
                    }
                    className="
                      self-center
                      bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-2
                      w-16 h-8 
                      sm:w-32 sm:h-10 
                      rounded-full
                      flex items-center justify-center
                      mr-3
                      "
                  >
                    <span className="text-xs">
                      <FormattedMessage id="OrderHistory.detail.title" />
                    </span>
                  </button>
                </div>
                {showDetail[row.orderId] && (
                  <DetailMore
                    row={row}
                    onClose={() =>
                      setShowDetail({ ...showDetail, [row.orderId]: false })
                    }
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <ReactPaginate
        className="text-black align-middle flex justify-center items-center space-x-4 pt-2"
        previousLabel={"← Previous"}
        nextLabel={"Next →"}
        pageCount={Math.ceil(rows.length / rowsPerPage)}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        previousLinkClassName={"pagination__link  hover:text-red-500 "}
        nextLinkClassName={"pagination__link  hover:text-red-500 "}
        pageLinkClassName={
          "pagination__link  hover:text-red-500 active:text-red-500"
        }
        disabledClassName={"pagination__link--disabled"}
        activeClassName={"pagination__link--active text-red-500"}
      />
    </div>
  );
};

export default DetailOrder;
