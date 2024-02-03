import React, { useRef, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { Button } from "@nextui-org/react";
import { FaTrash, FaPen } from "react-icons/fa";
import EditField from "./editField";
import { RiArrowGoBackFill } from "react-icons/ri";

interface Order {
  orderId: string;
  mass: number;
  length: number;
  width: number;
  height: number;
  pickupLocation: string;
  deliveryLocation: string;
  fee: number;
  cod: number;
  status: number;
}

interface DetailNotificationProps {
  onClose: () => void;
  dataInitial: {
    consignmentCode?: string;
    barcode?: string;
    deliveryManName?: string;
    licensePlate?: string;
    container?: string;
    consState?: number;
    consCode?: string;
    orders?: Order[];
    carrierName?: string;
    mass?: number;
    id?: number;
  };
}

const DetailNotification: React.FC<DetailNotificationProps> = ({ onClose, dataInitial }) => {
  const [isShaking, setIsShaking] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [data, setData] = useState(dataInitial);
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [delMulti, setDelMulti] = useState(false);
  const [isDataModified, setIsDataModified] = useState(false);

  const handleClickOutside = (event: MouseEvent) => {
    if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
      setIsShaking(true);
      setTimeout(() => {
        setIsShaking(false);
      }, 300);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  useEffect(() => {
    if (data != dataInitial){
      setIsDataModified(true)
    }
    else setIsDataModified(false)
  }, [data]);

  const handleCancelChanges = () => {
    setData(dataInitial);
    setSelectedOrders([]);
    setDelMulti(false);
    setIsDataModified(false);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleAnimationComplete = () => {
    if (!isVisible) {
      onClose();
    }
  };

  const handleDeleteOrder = () => {
    if (delMulti) {
      const updatedOrders = data.orders.filter((order) => !selectedOrders.includes(order.orderId));
      setData({ ...data, orders: updatedOrders });
      setSelectedOrders([]);
      setDelMulti(false)
    }
    else {
      setDelMulti(true)
    }
  };

  const handleCheckboxChange = (orderId: string) => {
    setSelectedOrders((prevSelected) => {
      if (prevSelected.includes(orderId)) {
        return prevSelected.filter((selectedId) => selectedId !== orderId);
      } else {
        return [...prevSelected, orderId];
      }
    });
  };

  const handleOrderFieldChange = (orderId: string, field: string, value: string | number) => {
    const updatedOrders = data.orders.map((order) => {
      if (order.orderId === orderId) {
        return { ...order, [field]: value };
      }
      return order;
    });
    setData({ ...data, orders: updatedOrders });
  };

  return (
    <motion.div
      className={`fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-60 z-50 text-[#545e7b]`}
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      onAnimationComplete={handleAnimationComplete}
      style={{
        backdropFilter: "blur(12px)"
      }}
    >
      <motion.div
        ref={notificationRef}
        className={`relative w-[98%] sm:w-9/12 bg-[#14141a] rounded-xl p-4 overflow-y-auto
          ${isShaking ? 'animate-shake' : ''}`}
        initial={{ scale: 0 }}
        animate={{ scale: isVisible ? 1 : 0 }}
        exit={{ scale: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative items-center justify-center flex-col flex h-10 w-full border-b-2 border-[#545e7b]">
          <div className="font-bold text-lg sm:text-2xl pb-2 text-white w-full text-center">Thông tin lô hàng</div>
          <Button className="absolute right-0 w-8 h-8 rounded-full mb-2 hover:bg-gray-300" onClick={handleClose}>
            <IoMdClose className="w-5/6 h-5/6 " />
          </Button>
        </div>
        <div className="h-screen_3/5 overflow-y-scroll border border-[#545e7b] mt-4 no-scrollbar flex flex-col bg-[#14141a] p-2 rounded-md text-white">
          <div className="flex flex-col">
            <div className="text-center text-lg sm:text-xl font-semibold">Mã lô hàng: {data.consignmentCode}</div>
            <div className={`flex flex-col xl:flex-row justify-between pt-2 pl-2`}>
              <div className="w-full mr-2">
                <div className="flex items-center">
                  <span className="mr-2">+ Mã vạch:</span>
                  <EditField data={data.barcode} setData={(value) => setData({ ...data, barcode: value.toString() })} type="text" />
                </div>
                <div className="flex items-center">
                  <span className="mr-2">+ Khối lượng (kg):</span>
                  <EditField data={data.mass} setData={(value) => setData({ ...data, mass: Number(value) })} type="number" />
                </div>
                <div className="flex items-center">
                  <span className="mr-2">+ Container:</span>
                  <EditField data={data.container} setData={(value) => setData({ ...data, container: value.toString() })} type="text" />
                </div>
              </div>
              <div className="w-full">
                <div className="flex items-center">
                  <span className="mr-2">+ Đối tác vận chuyển:</span>
                  <EditField data={data.carrierName} setData={(value) => setData({ ...data, carrierName: value.toString() })} type="text" />
                </div>
                <div className="flex items-center">
                  <span className="mr-2">+ Người giao hàng:</span>
                  <EditField data={data.deliveryManName} setData={(value) => setData({ ...data, deliveryManName: value.toString() })} type="text" />
                </div>
                <div className="flex items-center">
                  <span className="mr-2">+ Biển số xe:</span>
                  <EditField data={data.licensePlate} setData={(value) => setData({ ...data, licensePlate: value.toString() })} type="text" />
                </div>
              </div>
            </div>
            <div className="text-center text-lg mt-2">
              Trạng thái:{" "}
              {(() => {
                let statusLabel = "";
                let statusColor = "";

                switch (data.consState) {
                  case 1:
                    statusLabel = "Đang vận chuyển";
                    statusColor = "text-green-600";
                    break;
                  case 2:
                    statusLabel = "Đang lấy hàng";
                    statusColor = "text-green-700";
                    break;
                  case 3:
                    statusLabel = "Đã giao";
                    statusColor = "text-green-500";
                    break;
                  case 4:
                    statusLabel = "Đã hủy";
                    statusColor = "text-red-500";
                    break;
                  default:
                    statusLabel = "Unknown";
                }

                return <span className={`${statusColor} font-semibold text-xl`}>{statusLabel}</span>;
              })()}
            </div>
            <Button
              className={`w-1/2 sm:w-1/3 self-center h-10 rounded-lg mt-5 mb-1 py-3 border-red-700 hover:bg-red-700 text-red-500
                bg-transparent drop-shadow-md hover:drop-shadow-xl hover:text-white border 
                hover:shadow-md mr-2 ${delMulti? 'outline outline-red-700':''}`}
              onClick={() => handleDeleteOrder()}
            >
              <FaTrash className="hidden sm:block mr-2" />
              <span className="block">{delMulti? "Xác nhận": "Xóa hàng loạt"}</span>
            </Button>
          </div>
          
          <div className="pt-2 grid lg:grid-cols-2 gap-2">
            <AnimatePresence initial={false}>
              {data.orders.map((order: Order) => (
                <motion.div
                  key={order.orderId}
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`border border-[#545e7b] rounded-lg p-2 bg-[#1a1b23] flex flex-col ${
                    selectedOrders.includes(order.orderId) ? 'bg-gray-700' : ''
                  }`}
                  onClick={() => {delMulti? handleCheckboxChange(order.orderId) : {}}}
                >
                  <div className="text-center font-semibold pb-2">ID: {order.orderId}</div>
                  <div className="flex items-center">
                    <span className="mr-2">+ Khối lượng:</span>
                    <EditField data={order.mass} setData={(value) => handleOrderFieldChange(order.orderId, 'mass', value)} type="number" />
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2">+ Dài:</span>
                    <EditField data={order.length} setData={(value) => handleOrderFieldChange(order.orderId, 'length', value)} type="number" />
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2">+ Rộng:</span>
                    <EditField data={order.width} setData={(value) => handleOrderFieldChange(order.orderId, 'width', value)} type="number" />
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2">+ Cao:</span>
                    <EditField data={order.height} setData={(value) => handleOrderFieldChange(order.orderId, 'height', value)} type="number" />
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2">+ Điểm gửi:</span>
                    <EditField data={order.pickupLocation} setData={(value) => handleOrderFieldChange(order.orderId, 'pickupLocation', value)} type="text" />
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2">+ Điểm nhận:</span>
                    <EditField data={order.deliveryLocation} setData={(value) => handleOrderFieldChange(order.orderId, 'deliveryLocation', value)} type="text" />
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2">+ Phí:</span>
                    <EditField data={order.fee} setData={(value) => handleOrderFieldChange(order.orderId, 'fee', value)} type="number" />
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2">+ COD:</span>
                    <EditField data={order.cod} setData={(value) => handleOrderFieldChange(order.orderId, 'cod', value)} type="number" />
                  </div>
                  <div className="text-center">
                    Trạng thái:{" "}
                    {(() => {
                      let statusLabel = "";
                      let statusColor = "";

                      switch (order.status) {
                        case 1:
                          statusLabel = "Đang vận chuyển";
                          statusColor = "text-green-600";
                          break;
                        case 2:
                          statusLabel = "Đã giao";
                          statusColor = "text-green-500";
                          break;
                        case 3:
                          statusLabel = "Đã hủy";
                          statusColor = "text-red-500";
                          break;
                        default:
                          statusLabel = "Unknown";
                      }

                      return <span className={`${statusColor} font-semibold`}>{statusLabel}</span>;
                    })()}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
        <div className="w-full flex">
          <Button
            className={`w-full rounded-lg mt-5 mb-1 py-3 ${isDataModified ? 'border-orange-500 hover:bg-orange-500 text-orange-500' : 'border-red-700 hover:bg-red-700 text-red-500'}
              bg-transparent drop-shadow-md hover:drop-shadow-xl hover:text-white border 
              hover:shadow-md mr-2`}
            onClick={isDataModified ? handleCancelChanges : ()=>alert("Đã xóa lô hàng")}
          >
            {isDataModified ? (
              <>
                <RiArrowGoBackFill className="xs:mr-2 mt-[0.3px] " />
                <span className="hidden xs:block">Hủy thay đổi</span>
              </>
            ) : (
              <>
                <FaTrash className="xs:mr-2" />
                <span className="hidden xs:block">Xóa lô hàng</span>
              </>
            )}
          </Button>
          <Button
            className="w-full rounded-lg mt-5 mb-1 py-3 border-green-700 hover:bg-green-700 text-green-500
              bg-transparent drop-shadow-md hover:drop-shadow-xl hover:text-white border 
              hover:shadow-md"
          >
            <FaPen className="xs:mr-2" />
            <span className="hidden xs:block">Lưu chỉnh sửa</span>
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DetailNotification;