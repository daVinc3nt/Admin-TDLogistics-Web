import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";

interface RechargeNotificationProps {
  onClose: () => void;
}

const WithdrawNotification: React.FC<RechargeNotificationProps> = ({ onClose }) => {
  const [formValues, setFormValues] = useState<number>();
  const [formErrors, setFormErrors] = useState<string>();
  const [isShaking, setIsShaking] = useState(false);
  const [selectedTopUpIndex, setSelectedTopUpIndex] = useState<number | null>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  const validate = (values: number): string => {
    var errors: string = "";
    if (values < 10000) {
      errors = "Số tiền cần lớn hơn 10,000đ";
    }
    if (!values) {
      errors = "Vui lòng nhập số tiền";
    }
    return errors;
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const numericValue = inputValue.replace(/\D/g, '');
    event.target.value = numericValue;

    const value = parseInt(event.target.value);
    setFormValues(value);
    setFormErrors(validate(value));
    setSelectedTopUpIndex(null);

    const matchingIndex = topUpValues.findIndex((topUpValue) => topUpValue === value);
    if (matchingIndex !== -1) {
      setSelectedTopUpIndex(matchingIndex);
    }
  };

  const handleTopUpClick = (amount: number, index: number) => {
    setFormValues(amount);
    setFormErrors(validate(amount));

    setSelectedTopUpIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
      setIsShaking(true);
      setTimeout(() => {
        setIsShaking(false);
      }, 300);
    }
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const handleAnimationComplete = () => {
    if (!isVisible) {
      onClose();
    }
  };

  const topUpValues = [100000, 200000, 300000, 400000, 500000, 600000, 700000, 800000, 900000, 1000000, 1500000, 2000000];

  return (
    <motion.div
      className={`fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 z-50`}
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      onAnimationComplete={handleAnimationComplete}
    >
      <motion.div
        ref={notificationRef}
        className={`relative w-5/6 sm:w-96 bg-white rounded-xl p-4 border-2 border-red-500 overflow-y-auto
          ${isShaking ? 'animate-shake' : ''}`}
        initial={{ scale: 0 }}
        animate={{ scale: isVisible ? 1 : 0 }}
        exit={{ scale: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative items-center flex-col flex h-10 w-full border-b-2 border-gray-300">
          <div className="font-bold text-xl">Rút tiền</div>
          <button className="absolute right-0 w-8 h-8 rounded-full mb-2 hover:bg-gray-300" onClick={handleClose}>
            <IoMdClose className="text-gray-500 w-5/6 h-5/6 ml-[0.2rem]"/>
          </button>
        </div>
        <div className={`relative self-center w-full mt-6 pb-6 border-b-2 border-gray-300`}>
          <input
            id="topup"
            name="topup"
            type="text"
            inputMode="numeric"
            className={`peer h-12 self-center w-full border border-gray-300 rounded focus:outline-none 
              ${formErrors ? 'ring-2 ring-red-500 focus:ring-2 focus:ring-red-500' : 'focus:ring-2 focus:ring-blue-500'}
              text-left placeholder-transparent pl-3 pt-2 text-headlineText-default`}
            placeholder="Địa chỉ"
            onChange={handleInputChange}
            value={formValues ? new Intl.NumberFormat('vi-VN', { currency: 'VND' }).format(formValues) : ''}
          />
          <label
            htmlFor="topup"
            className={`absolute left-3 -top-0 text-xxs leading-5 text-gray-600 transition-all 
              peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-700 peer-placeholder-shown:top-3.5 
              peer-focus:-top-0 peer-focus:leading-5 peer-focus:text-xxs
              ${formErrors ? 'peer-focus:text-red-500' : 'peer-focus:text-blue-600'} `}
          >
            Nhập số tiền
          </label>
          <p className="text-red-500 absolute text-sm overflow-hidden pt-1">{formErrors}</p>
        </div>
        <div className="mt-2 pb-4 border-b-2 border-gray-300">
          <p className="pl-1">Hoặc chọn giá trị top-up:</p>
          <div className="grid grid-cols-2 xs:grid-cols-3  gap-2 mt-2">
            {topUpValues.map((value, index) => (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={index}
                className={`px-2 xs:px-4 py-2 rounded text-xs xs:text-sm ${
                  selectedTopUpIndex === index ? 'bg-LitghRedGradient text-white' : value === formValues ? 'bg-LitghRedGradient text-white' : 'bg-white border border-gray-500 overflow-hidden'
                }`}
                onClick={() => handleTopUpClick(value, index)}
              >
                {new Intl.NumberFormat('vi-VN', { currency: 'VND' }).format(value)}
              </motion.button>
            ))}
          </div>
        </div>
        <motion.button 
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="w-full rounded-lg mt-5 mb-1 py-3 bg-buttonColorForm-default hover:bg-buttonColorForm-hover text-buttonColorForm-text">
          Tiếp tục
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default WithdrawNotification;
