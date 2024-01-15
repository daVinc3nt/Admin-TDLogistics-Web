import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
interface OrderNotificationProps {
  onClose: () => void; // Callback function to close the notification window
  select: string;
}

const ProblemExport: React.FC<OrderNotificationProps> = ({
  onClose,
  select,
}) => {
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
      className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onAnimationComplete={handleAnimationComplete}
    >
      <motion.div
        ref={notificationRef}
        className="relative w-8/12 lg:w-5/12 h-4/6 bg-white rounded-xl p-4 overflow-y-scroll"
        initial={{ scale: 0 }}
        animate={{ scale: isVisible ? 1 : 0 }}
        exit={{ scale: 0 }}
        transition={{ duration: 0.2 }}
      >
        <div className="font-bold">Trợ giúp</div>
        <motion.button
          transition={{ duration: 0.3 }}
          className="absolute top-0 right-0  px-4 py-2 bg-white text-stone-500 rounded-full"
          onClick={handleClose}
        >
          X
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default ProblemExport;
