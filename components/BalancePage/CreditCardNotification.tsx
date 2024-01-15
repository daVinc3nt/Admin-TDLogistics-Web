import React, { useRef, useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import { IoMdClose } from "react-icons/io";

interface CustomerInfo {
    accountBalance: number;
    promotionalBalance: number;
}

interface CreditCardNotificationProps {
    customerInfo:CustomerInfo;
    onClose: () => void;
}

const CreditCardNotification: React.FC<CreditCardNotificationProps> = ({ customerInfo, onClose }) => {
  const [formValues, setFormValues] = useState<number>();
  const [formErrors, setFormErrors] = useState<string>();
  const [isShaking, setIsShaking] = useState(false);
  const [selectedTopUp, setSelectedTopUp] = useState<number | null>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    setIsChecked((prev) => !prev);
  };

  const validate = (values: number): string => {
    var errors: string = "";
    if (values < 10000) {
      errors = "Số tiền cần lớn hơn 10,000đ";
    }
    return errors;
  };

  const fadeOut: Variants = {
    initial: { scale: 0.5, opacity: 0 },
    enter: { scale: 1, opacity: 1 },
    exit: { scale: 0.5, opacity: 0 }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const numericValue = inputValue.replace(/\D/g, '');
    event.target.value = numericValue;

    const value = parseInt(event.target.value);
    setFormValues(value);
    setFormErrors(validate(value));
  };

  const handleTopUpClick = (amount: number) => {
    setFormValues(amount);
    setFormErrors(validate(amount));
    setSelectedTopUp(amount === selectedTopUp ? null : amount);
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
          <div className="font-bold text-lg xs:text-xl">Ví TDLogistics</div>
          <button className="absolute right-0 w-8 h-8 rounded-full mb-2 hover:bg-gray-300" onClick={handleClose}>
            <IoMdClose className="text-gray-500 w-5/6 h-5/6 ml-[0.2rem]"/>
          </button>
        </div>
        <div className={`relative self-center w-full mt-6 pb-6 border-b-2 border-gray-300`}>
            <motion.div 
                variants={fadeOut} initial="initial" animate="enter" exit="exit"
                transition={{ duration: .5, delay: .3 }}
                className="h-36 xs:h-48 mx-1 bg-LitghRedGradient rounded-2xl flex flex-col" style={{
                'boxShadow': '8px 8px 6px -1px rgba(0, 0, 0, 0.3)',
            }}>
            <div className="relative flex flex-col p-4 h-32 rounded-t-2xl">
                <span className="text-xs xs:text-sm text-white font-bold">Tài khoản chính</span>
                <span className="text-xl xs:text-2xl text-white font-medium">{new Intl.NumberFormat('vi-VN', { currency: 'VND' }).format(customerInfo.accountBalance)}₫</span>
                <span className="absolute bottom-2 text-xs xs:text-sm grow text-white">Tài khoản khuyến mãi <b>₫{customerInfo.promotionalBalance}</b></span>
            </div>
          </motion.div>
        </div>
        <div className="rounded-lg mt-5 mb-1 py-1 text-buttonColorForm-text flex flex-col xs:flex-row">
            <span className="text-xs font-bold self-center xs:text-sm text-black xs:pl-2 sm:pl-6 xs:pr-10 whitespace-nowrap">
                Đặt làm phương thức mặc định
            </span>
            <div className="self-center xs:absolute xs: right-8 mt-3 xs:mt-2"><label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" className="sr-only peer" onClick={handleToggle} />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-400 peer-checked:after:translate-x-full 
                rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] 
                after:absolute after:top-0.5 after:left-0.5 after:start-[2px] 
                after:bg-white after:border-gray-300 after:border after:rounded-full 
                after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-LitghRedGradient"></div>
            </label>
            </div>

        </div>
      </motion.div>
    </motion.div>
  );
};

export default CreditCardNotification;
