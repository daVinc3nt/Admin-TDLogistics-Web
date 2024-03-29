import React, { useRef, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { Button } from "@nextui-org/react";
import { FaTrash, FaPen } from "react-icons/fa";
import { User, Pencil } from "lucide-react";
import { FormattedMessage } from "react-intl";
import { Order } from "./column";
import { OrdersOperation, UpdatingOrderCondition, UpdatingOrderInfo } from "@/TDLib/tdlogistics";
import HorizontalLinearAlternativeLabelStepper from "@/components/Common/Timeline";
interface Props {
  onClose: () => void;
  dataInitial: Order
}

const DetailStaff: React.FC<Props> = ({ onClose, dataInitial }) => {
  const [isShaking, setIsShaking] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [data, setData] = useState(dataInitial);
  const [updateData, setupdateData] = useState<any>({});
  const handleUpdateData =(e, key:string) => {
      setupdateData({...updateData, [key]: parseInt(e.target.value)});
  }
  const handleClickOutside = (event: MouseEvent) => {
    if (
      notificationRef.current &&
      !notificationRef.current.contains(event.target as Node)
    ) {
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
  const [isEditing, setIsEditing] = useState(false);
  const handleEditClick = () => {
    setIsEditing(true);
  };
  const handleSaveClick = () => {
    const x ="staff_id"
    console.log("click",updateData)
    console.log(dataInitial)
    const condition: UpdatingOrderCondition = {order_id: dataInitial.order_id }
    const order =new OrdersOperation()
    order.update(updateData, condition)
    setIsEditing(false);
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
        backdropFilter: "blur(12px)",
      }}
    >
      <motion.div
        ref={notificationRef}
        className={`relative w-[98%] sm:w-9/12 bg-white
        dark:bg-[#14141a] rounded-xl p-4 overflow-y-auto
          ${isShaking ? "animate-shake" : ""}`}
        initial={{ scale: 0 }}
        animate={{ scale: isVisible ? 1 : 0 }}
        exit={{ scale: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative items-center justify-center flex-col flex h-10 w-full border-b-2 border-[#545e7b]">
          <div className="font-bold text-lg sm:text-2xl pb-2 text-white w-full text-center">
            <FormattedMessage id="Staff Information" />
          </div>
          <Button
            className="absolute right-0 w-8 h-8 rounded-full mb-2 hover:bg-gray-300"
            onClick={handleClose}
          >
            <IoMdClose className="w-5/6 h-5/6 " />
          </Button>
        </div>
        <div className="h-screen_3/5 border border-[#545e7b] mt-4 flex flex-col bg-white
         dark:bg-[#14141a] p-2 rounded-md text-black dark:text-white place-content-center">
          <div className="grid grid-cols-2 overflow-y-scroll">
            {/* order id và hình ảnh */}
            <div>
              <div className="flex flex-col gap-5">
                <div id="image">
                  <div className="font-bold text-base">
                    <FormattedMessage id="order.image" />
                  </div>
                  <div>
                    <User className="w-20 h-20  md:w-80 md:h-80" />
                  </div>
                </div>

                <div id="order_id" className="flex gap-5">
                  <div className="font-bold text-base">
                    <FormattedMessage id="order.Id" />
                  </div>
                    <div>{data.order_id}</div>
                </div>

                <div id="service_type" className="flex gap-5">
                  <div className="font-bold text-base">
                    Loại hình gửi
                  </div>
                    <div>{data.service_type}</div>
                </div>

                <div id="order_time" className="flex gap-5">
                  <div className="font-bold text-base">
                    Thời gian gửi
                  </div>
                    <div>{data.order_time}</div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col">
              {/* thông tin order, được chỉnh */}
              <div className="">
                <div className="flex flex-col gap-4">
                  <div id="mass" className="flex ">
                    <div className=" w-1/3 font-bold text-base">
                      <FormattedMessage id="order.mass" />
                    </div>
                    {isEditing ? (
                      <input
                        className="w-1/2 bg-transparent border-b-2 border-[#545e7b] text-white"
                        type="number"
                        value={data.mass}
                        onChange={(e) =>
                          {
                            setData({ ...data, mass: parseFloat(e.target.value)});
                            handleUpdateData(e, "mass");
                          }
                        }
                      />
                    ) : (
                      <div>{data.mass} kg</div>
                    )}
                  </div>

                  <div id="length" className="flex ">
                    <div className=" w-1/3 font-bold text-base">
                      <FormattedMessage id="order.length" />
                    </div>
                    {isEditing ? (
                      <input
                        className="w-1/2 bg-transparent border-b-2 border-[#545e7b] text-white"
                        type="number"
                        value={data.length}
                        onChange={(e) =>
                          {
                            setData({ ...data, height: parseFloat(e.target.value)  });
                            handleUpdateData(e, "length");
                          }
                        }
                      />
                    ) : (
                      <div>{data.length} m</div>
                    )}
                  </div>

                  <div id="width" className="flex ">
                    <div className=" w-1/3 font-bold text-base">
                      <FormattedMessage id="order.width" />
                    </div>
                    {isEditing ? (
                      <input
                        className="w-1/2 bg-transparent border-b-2 border-[#545e7b] text-white"
                        type="number"
                        value={data.width}
                        onChange={(e) =>
                          {
                            setData({ ...data, width: parseFloat(e.target.value)  });
                            handleUpdateData(e, "width");
                          }
                        }
                      />
                    ) : (
                      <div>{data.width} m</div>
                    )}
                  </div>

                  <div id="height" className="flex ">
                    <div className=" w-1/3 font-bold text-base">
                      <FormattedMessage id="order.height" />
                    </div>
                    {isEditing ? (
                      <input
                        className="w-1/2 bg-transparent border-b-2 border-[#545e7b] text-white"
                        type="number"
                        value={data.height}
                        onChange={(e) =>
                          {
                            setData({ ...data, height: parseFloat(e.target.value)  });
                            handleUpdateData(e, "height");
                          }
                        }
                      />
                    ) : (
                      <div>{data.height} m</div>
                    )}
                  </div>

                  <div id="fee" className="flex ">
                    <div className=" w-1/3 font-bold text-base">
                    <FormattedMessage id="order.fee" />
                    </div>
                    {isEditing ? (
                      <input
                        className="w-1/2 bg-transparent border-b-2 border-[#545e7b] text-white"
                        type="number"
                        value={data.fee}
                        onChange={(e) =>
                          {
                            setData({ ...data, fee: parseFloat(e.target.value)  });
                            handleUpdateData(e, "fee");
                          }
                        }
                      />
                    ) : (
                      <div>{data.fee} vnd</div>
                    )}
                  </div>

                  <div id="COD" className="flex ">
                    <div className=" w-1/3 font-bold text-base">
                      COD
                    </div>
                    {isEditing ? (
                      <input
                        className="w-1/2 bg-transparent border-b-2 border-[#545e7b] text-white"
                        type="number"
                        value={data.COD}
                        onChange={(e) =>
                          {
                            setData({ ...data, COD: parseFloat(e.target.value)  });
                            handleUpdateData(e, "COD");
                          }
                        }
                      />
                    ) : (
                      <div>{data.COD} vnd</div>
                    )}
                  </div>

                  <div id="agency_id" className="flex ">
                    <div className=" w-1/3 font-bold text-base">
                      Bưu cục
                    </div>
                      <div>{data.agency_id}</div>
                  </div>

                  <div id="Container" className="flex ">
                    <div className=" w-1/3 font-bold text-base">
                      Container
                    </div>
                      <div>{data.container}</div>
                  </div>

                  <div id="name_receiver" className="flex ">
                    <div className=" w-1/3 font-bold text-base">
                      Tên người nhận
                    </div>
                      <div>{data.name_receiver}</div>
                  </div>

                  <div id="name_sender" className="flex ">
                    <div className=" w-1/3 font-bold text-base">
                      Tên người gửi
                    </div>
                      <div>{data.name_sender}</div>
                  </div>

                  <div id="source" className="flex ">
                    <div className=" w-1/3 font-bold text-base">
                      Địa chỉ gửi hàng
                    </div>
                    <div className="w-8/12">
                        {data.detail_source}, {data.ward_source}, {data.district_source}, {data.province_source}
                      </div>
                  </div>

                  <div id="destination" className="flex ">
                    <div className=" w-1/3 font-bold text-base">
                      Địa chỉ giao hàng
                    </div>
                    <div className="w-8/12">
                    {data.detail_dest}, {data.ward_dest}, {data.district_dest}, {data.province_dest}
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
            { data.journey.length !== 0 ? 
            <div className="p-10">
              <HorizontalLinearAlternativeLabelStepper stage={data.journey}/> 
            </div>
            : <></> }
        </div>

        <div className="w-full flex">
          {!isEditing ? (
            <Button
              className="w-full rounded-lg mt-5 mb-1 py-3 border-green-700 hover:bg-green-700 text-green-500
              bg-transparent drop-shadow-md hover:drop-shadow-xl hover:text-white border 
              hover:shadow-md"
              onClick={handleEditClick}
            >
              <FaPen className="xs:mr-2" />
              <span className="hidden xs:block">
                <FormattedMessage id="Edit" />
              </span>
            </Button>
          ) : (
            <Button
              className="w-full rounded-lg mt-5 mb-1 py-3 border-green-700 hover:bg-green-700 text-green-500
    bg-transparent drop-shadow-md hover:drop-shadow-xl hover:text-white border 
    hover:shadow-md"
              onClick={handleSaveClick}
            >
              <FaPen className="xs:mr-2" />
              <span className="hidden xs:block">
                <FormattedMessage id="Save" />
              </span>
            </Button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DetailStaff;
