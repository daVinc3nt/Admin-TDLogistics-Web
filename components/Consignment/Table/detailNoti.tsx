import React, { useRef, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { Button } from "@nextui-org/react";
import { FaTrash, FaPen } from "react-icons/fa";

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

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleAnimationComplete = () => {
    if (!isVisible) {
      onClose();
    }
  };

  const handleDeleteOrder = (orderId: string) => {
    const updatedOrders = data.orders.filter((order) => order.orderId !== orderId);
    setData({ ...data, orders: updatedOrders});
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
            <IoMdClose className="w-5/6 h-5/6 "/>
          </Button>
        </div>
        <div className="h-screen_3/5 overflow-y-scroll border border-[#545e7b] mt-4 no-scrollbar flex flex-col bg-[#14141a] p-2 rounded-md text-white">
          <div className="text-center text-lg sm:text-xl font-semibold">Mã lô hàng: {data.consignmentCode}</div>
          <div className={`flex flex-col sm:flex-row justify-between pt-2 pl-2`}>
            <div className="w-full mr-2">
              <div>+ Mã vạch: {data.barcode}</div>
              <div>+ Khối lượng (kg): {data.mass}</div>
              <div>+ Container: {data.container}</div>
            </div>
            <div className="w-full">
              <div>+ Đối tác vận chuyển: {data.carrierName}</div>
              <div>+ Người giao hàng: {data.deliveryManName}</div>
              <div>+ Biển số xe: {data.licensePlate}</div>
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
          <div className="pt-2 grid lg:grid-cols-2 gap-2">
            <AnimatePresence initial={false}>
            {data.orders.map((order: Order) => (
              <motion.div key={order.orderId} 
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }} 
                className="border border-[#545e7b] rounded-lg p-2 bg-[#1a1b23] flex flex-col">
                <div className="text-center font-semibold pb-2">ID: {order.orderId}</div>
                <div>+ Khối lượng: {order.mass}</div>
                <div className="flex flex-col sm:flex-row">
                  <div className="pr-4">+ Dài: {order.length}</div>
                  <div className="pr-4">+ Rộng: {order.width}</div>
                  <div>+ Cao: {order.height}</div>
                </div>
                <div>+ Điểm gửi: {order.pickupLocation}</div>
                <div>+ Điểm nhận: {order.deliveryLocation}</div>
                <div>+ Phí: {order.fee}</div>
                <div>+ COD: {order.cod}</div>
                <div className="text-center">Trạng thái:{" "}
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
                })()}</div>
                <Button 
                  className="mt-2 rounded-md p-1 h-8 border-red-700 hover:bg-red-700 text-red-500
                  bg-transparent hover:text-white border hover:shadow-md"
                  onClick={() => handleDeleteOrder(order.orderId)}
                >
                  <FaTrash className="xs:mr-2"/>
                  <span className="hidden xs:block">Xóa đơn hàng</span>
                </Button>
              </motion.div>
            ))}
            </AnimatePresence>
          </div>
        </div>
        <div className="w-full flex">
          <Button 
              className="w-full rounded-lg mt-5 mb-1 py-3 border-red-700 hover:bg-red-700 text-red-500
              bg-transparent drop-shadow-md hover:drop-shadow-xl hover:text-white border 
              hover:shadow-md mr-2">
            <FaTrash className="xs:mr-2"/>
            <span className="hidden xs:block">Xóa lô hàng</span>
          </Button>
          <Button 
              className="w-full rounded-lg mt-5 mb-1 py-3 border-green-700 hover:bg-green-700 text-green-500
              bg-transparent drop-shadow-md hover:drop-shadow-xl hover:text-white border 
              hover:shadow-md">
            <FaPen className="xs:mr-2"/>
            <span className="hidden xs:block">Chỉnh sửa</span>
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DetailNotification;
