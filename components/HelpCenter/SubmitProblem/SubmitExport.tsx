import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import SubmitSelect from "./SubmitSelect";
import { FormattedMessage } from "react-intl";
interface OrderNotificationProps {
  onClose: () => void; // Callback function to close the notification window
}

const OrderNotification: React.FC<OrderNotificationProps> = ({ onClose }) => {
  const notificationRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

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

  const handleClose = () => {
    setIsVisible(false);
  };
  const handleSubmit = () => {
    {
      /* Gửi yêu cầu */
    }
    setIsVisible(false);
  };

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onAnimationComplete={handleAnimationComplete}
    >
      <motion.div
        ref={notificationRef}
        className="relative w-8/12 lg:w-5/12 h-4/6 bg-white rounded-xl p-4 overflow-y-scroll flex flex-col justify-between"
        initial={{ scale: 0 }}
        animate={{ scale: isVisible ? 1 : 0 }}
        exit={{ scale: 0 }}
        transition={{ duration: 0.2 }}
      >
        <div>
          <div className="font-bold">
            <FormattedMessage id="Helpcenter.title.inlink.title" />
          </div>
          <div>
            <div>
              <SubmitSelect />
            </div>
          </div>
          <motion.button
            transition={{ duration: 0.3 }}
            className="absolute top-0 right-0 px-4 py-2 bg-white text-stone-500 rounded-full"
            onClick={handleClose}
          >
            X
          </motion.button>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="mt-5 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
          onClick={handleSubmit}
        >
          <FormattedMessage id="Helpcenter.title.link" />
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default OrderNotification;
