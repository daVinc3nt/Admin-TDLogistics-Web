import React, { useState } from "react";
import { FaPlus, FaMinus } from 'react-icons/fa';
import Dropdown from "./ListBox";
import DatePickerOrder from "./DatePickerOrder/DatePickerOrder";
import { motion, Variants } from "framer-motion";

const MoreDetailsForm = ({selectedOption3, setSelectedOption3, selectedOption4, setSelectedOption4}) => {
  const typesOfGoods = ['Mỹ phẩm', 'Dược phẩm', 'Thực phẩm', 'Đồ uống', 'Vật liệu phục vụ sản xuất', 'Thiết bị, máy móc, đồ điện tử', 'Nội thất, trang trí', 'Bao bì, may mặc'];
  const weightOptions = ['Dưới 500kg', '500 - 1000kg', '1001 - 1500kg', 'Trên 1500kg'];
  const [value, setValue] = useState(0);
  const [value1, setValue1] = useState(0);
  const [value2, setValue2] = useState(0);
  const tabContentVariants: Variants = {
    initial: {
      x: 20,
      opacity: 0
    },
    enter: {
      x: 0,
      opacity: 1
    },
    exit: {
      x: -20,
      opacity: 0
    }
  }

  const handleIncrement = () => {
    setValue((prevValue) => (prevValue + 1) % 51);
  };

  const handleDecrement = () => {
    setValue((prevValue) => (prevValue - 1 + 51) % 51);
  };

  const handleIncrement1 = () => {
    setValue1((prevValue) => (prevValue + 1) % 51);
  };

  const handleDecrement1 = () => {
    setValue1((prevValue) => (prevValue - 1 + 51) % 51);
  };

  const handleIncrement2 = () => {
    setValue2((prevValue) => (prevValue + 1) % 51);
  };

  const handleDecrement2 = () => {
    setValue2((prevValue) => (prevValue - 1 + 51) % 51);
  };

  return <div className="flex flex-col h-5/6 w-full mt-4 lg:mt-8 border-2 border-red-500 rounded-md overflow-y-auto no-scrollbar scroll-smooth">
    <motion.h1
      variants={tabContentVariants}
      initial="initial"
      animate="enter"
      exit="exit"
      transition={{
        duration: .5
      }}
      className="mt-2 text-2xl font-bold pl-6 text-black text-nowrap cursor-default">
      Thêm chi tiết
    </motion.h1>
    <motion.div
      variants={tabContentVariants}
      initial="initial"
      animate="enter"
      exit="exit"
      transition={{
        duration: .5
      }}
      className="flex flex-col items-stretch self-center w-11/12 mb-5 mt-2 bg-formBgColor-firstChild rounded-2xl"
    >

      <h1 className="mt-4 text-sm font-bold pl-5 text-black text-nowrap cursor-default">Thời gian lấy hàng</h1>

      <DatePickerOrder />

      <Dropdown name="Loại hàng hóa" options={typesOfGoods} selectedOption={selectedOption3} setSelectedOption={setSelectedOption3}/>

      <Dropdown name="Tổng trọng lượng" options={weightOptions} selectedOption={selectedOption4} setSelectedOption={setSelectedOption4}/>

      <h1 className="text-sm font-bold pl-5 text-black text-nowrap cursor-default">Kích thước (không bắt buộc)</h1>

      <div className="flex flex-col sm:flex-row justify-center self-center w-11/12 rounded-2xl my-4">

        <div className="relative self-center sm:grow w-full">
          <input
            id="orderLength1"
            name="orderLength1"
            value={value}
            className="h-12 self-center w-full border border-gray-300 
                          rounded focus:outline-none focus:ring-2 cursor-default
                          placeholder-gray focus:ring-red-500 text-center text-black"
            placeholder="Value"
            readOnly
          />
          <label
            htmlFor="orderLength1"
            className="absolute left-3 -top-2.5 bg-white px-1 text-xxs leading-5 text-gray-600 transition-all 
                      peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-700 peer-placeholder-shown:top-3.5 
                      peer-focus:-top-0 peer-focus:leading-5 peer-focus:text-red-500 peer-focus:text-xxs rounded-3xl"
          >
            Dài (m)
          </label>
          <button
            className="absolute top-1/2 h-12 w-10 right-0 flex items-center pointer-event-stroke
                          -translate-y-1/2 text-xs hover:text-sm
                          rounded-r-xl"
            onClick={handleIncrement}
          >
            <FaPlus className="flex text-black w-full border-l-2" />
          </button>
          <button
            className="absolute top-1/2 h-12 w-10 left-0 flex items-center pointer-event-stroke
                          -translate-y-1/2 text-xs hover:text-sm
                          rounded-l-xl"
            onClick={handleDecrement}
          >
            <FaMinus className="flex text-black w-full border-r-2" />
          </button>
        </div>

        <div className="relative self-center sm:grow sm:ml-4 w-full mt-4 sm:mt-0">
          <input
            id="orderLength2"
            name="orderLength2"
            type="text"
            value={value1}
            className="h-12 self-center w-full border border-gray-300 
                          rounded focus:outline-none focus:ring-2 cursor-default
                          placeholder-gray focus:ring-red-500 text-center text-black"
            placeholder="Value"
            readOnly
          />
          <label
            htmlFor="orderLength2"
            className="absolute left-3 -top-2.5 bg-white px-1 text-xxs leading-5 text-gray-600 transition-all 
                      peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-700 peer-placeholder-shown:top-3.5 
                      peer-focus:-top-0 peer-focus:leading-5 peer-focus:text-red-500 peer-focus:text-xxs rounded-3xl"
          >
            Rộng (m)
          </label>
          <button
            className="absolute top-1/2 h-12 w-10 right-0 flex items-center pointer-event-stroke
                          -translate-y-1/2 text-xs hover:text-sm
                          rounded-r-xl"
            onClick={handleIncrement1}
          >
            <FaPlus className="flex text-black w-full border-l-2" />
          </button>
          <button
            className="absolute top-1/2 h-12 w-10 left-0 flex items-center pointer-event-stroke
                          -translate-y-1/2 text-xs hover:text-sm
                          rounded-l-xl"
            onClick={handleDecrement1}
          >
            <FaMinus className="flex text-black w-full border-r-2" />
          </button>
        </div>

        <div className="relative self-center sm:grow sm:ml-4 w-full mt-4 sm:mt-0">
          <input
            id="orderLength3"
            name="orderLength3"
            type="text"
            value={value2}
            className="h-12 self-center w-full border border-gray-300 
                          rounded focus:outline-none focus:ring-2 cursor-default
                          placeholder-gray focus:ring-red-500 text-center text-black"
            placeholder="Value"
            readOnly
          />
          <label
            htmlFor="orderLength3"
            className="absolute left-3 -top-2.5 bg-white px-1 text-xxs leading-5 text-gray-600 transition-all 
                      peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-700 peer-placeholder-shown:top-3.5 
                      peer-focus:-top-0 peer-focus:leading-5 peer-focus:text-red-500 peer-focus:text-xxs rounded-3xl"
          >
            Cao (m)
          </label>
          <button
            className="absolute top-1/2 h-12 w-10 right-0 flex items-center pointer-event-stroke
                          -translate-y-1/2 text-xs hover:text-sm
                          rounded-r-xl"
            onClick={handleIncrement2}
          >
            <FaPlus className="flex text-black w-full border-l-2" />
          </button>
          <button
            className="absolute top-1/2 h-12 w-10 left-0 flex items-center pointer-event-stroke
                          -translate-y-1/2 text-xs hover:text-sm
                          rounded-l-xl"
            onClick={handleDecrement2}
          >
            <FaMinus className="flex text-black w-full border-r-2" />
          </button>
        </div>

      </div>

    </motion.div>

  </div>
}

export default MoreDetailsForm;