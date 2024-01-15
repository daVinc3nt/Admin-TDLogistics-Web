import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FormattedMessage } from "react-intl";
interface DetailMoreProps {
  onClose: () => void; // Callback function to close the notification window
  row: {
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
  };
}

const DetailMore: React.FC<DetailMoreProps> = ({ onClose, row }) => {
  // Add 'row' to the destructured props
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

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-white bg-opacity-50 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      onAnimationComplete={handleAnimationComplete}
    >
      <motion.div
        ref={notificationRef}
        className="relative max-w-80 h-5/6 bg-white rounded-xl p-4 border-2 "
        initial={{ scale: 0 }}
        animate={{ scale: isVisible ? 1 : 0 }}
        exit={{ scale: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <p>
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

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-5 right-5 mt-4 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
          onClick={handleClose}
        >
          <FormattedMessage id="OrderHistory.Close" />
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default DetailMore;
