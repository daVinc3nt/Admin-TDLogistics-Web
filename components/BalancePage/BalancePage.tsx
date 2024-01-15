import React, { useState , useRef } from 'react';
import { motion, Variants, useAnimation } from "framer-motion";
import { HiDotsHorizontal , HiOutlineChevronDown } from 'react-icons/hi';
import RechargeNotification from './RechargeNotification';
import CreditCardNotification from './CreditCardNotification';
import { MdOutlineAddCircle } from "react-icons/md";
import { GiPayMoney } from "react-icons/gi";
import Link from 'next/link';
import { BsCashCoin, BsBank2, BsCashStack  } from "react-icons/bs";
import { RiPieChart2Fill } from "react-icons/ri";
import { IoIosArrowBack } from "react-icons/io";
import { SiZalo } from "react-icons/si";
import { FaCreditCard } from "react-icons/fa";
import TradeHistory from './TradeHistory';
import WithdrawNotification from './WithdrawNotification';

interface CustomerInfo {
  accountBalance: number;
  promotionalBalance: number;
  CODBalance:number;
}

const BalancePage = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [showNotification2, setShowNotification2] = useState(false);
  const [showNotification3, setShowNotification3] = useState(false);
  const [isPopoverVisible, setPopoverVisibility] = useState(false);
  const [isPopoverVisible2, setPopoverVisibility2] = useState(false);
  const [currentForm, setCurrentForm] = useState<number>(0);
  const controls = useAnimation();
  const controls2 = useAnimation();
  const scrollRef = useRef(null);

  const showPopover = () => {
    setPopoverVisibility(true);
    controls.start("enter");
  };

  const hidePopover = () => {
    setPopoverVisibility(false);
    controls.start(leftVariant.exit);
  };

  const showPopover2 = () => {
    setPopoverVisibility2(true);
    controls2.start("enter");
  };

  const hidePopover2 = () => {
    setPopoverVisibility2(false);
    controls2.start(leftVariant.exit);
  };

  const handleNotificationClose = () => {
    setShowNotification(false);
  };

  const handleNotificationClose2 = () => {
    setShowNotification2(false);
  };

  const handleNotificationClose3 = () => {
    setShowNotification3(false);
  };

  const handleStatisticsClick = () => {
    setCurrentForm(1);
    scrollRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const customerInfo: CustomerInfo = {
    accountBalance: 100000,
    promotionalBalance: 0,
    CODBalance: 0,
  };

  const leftVariant: Variants = {
    initial: { x: 0, opacity: 0 },
    enter: { x: 10, opacity: 1 },
    exit: { x: 0, opacity: 0 }
  }

  const rightSideVariant: Variants = {
    initial: { x: 50, opacity: 0 },
    enter: { x: 0, opacity: 1 },
    exit: { x: -20, opacity: 0 }
  }

  const leftSideVariant: Variants = {
    initial: { x: -50, opacity: 0 },
    enter: { x: 0, opacity: 1 },
    exit: { x: -20, opacity: 0 }
  }
  
  return (
    <div className='relative flex flex-col lg:flex-row w-full xs:h-[calc(100vh-3rem)] overflow-y-scroll no-scrollbar'>
        <div className='w-full xs:w-192 lg:w-96 h-fit grid grid-flow-row sm:grid-cols-2 lg:flex lg:flex-col p-2'>
          <motion.div 
            variants={leftSideVariant} initial="initial" animate="enter" exit="exit"
            transition={{ duration: .5 }}
            className="h-48 mx-1 mt-1 mb-4 bg-gradient-to-tl from-red-400 to-red-600 rounded-2xl flex flex-col" style={{
            'boxShadow': '8px 8px 6px -1px rgba(0, 0, 0, 0.2)',
          }}>
            <div className="relative flex flex-col p-4 h-32 rounded-t-2xl">
              <span className="text-sm text-white font-bold">Tài khoản chính</span>
              <span className="text-2xl text-white font-extrabold">{new Intl.NumberFormat('vi-VN', { currency: 'VND' }).format(customerInfo.accountBalance)}₫</span>
              <span className="absolute bottom-2 text-sm grow text-white whitespace-nowrap">Tài khoản khuyến mãi <b>₫{customerInfo.promotionalBalance}</b></span>
              <button className="absolute top-3 right-3 bg-red-600 rounded-full w-10 h-5 text-white hover:animate-hoverScale outline-2 outline-double outline-white" onClick={() => {setShowNotification2(true)}}><HiDotsHorizontal className="h-full w-full"/></button>
            </div>
            <button className="relative mx-[0.15rem] mt-0 mb-[0.15rem] bg-white grow rounded-b-[0.9rem]" onClick={() => {setShowNotification(true)}}>
              <MdOutlineAddCircle className="absolute text-red-500 w-10 h-5 top-1/2 -translate-y-1/2"/>
              <span className="absolute left-10 text-red-500 font-bold top-1/2 -translate-y-1/2 pb-0.5">Nạp tiền</span>
              <HiOutlineChevronDown className="absolute text-red-500 right-4 top-1/2 text-xl -translate-y-1/2 -rotate-90"/>
            </button>
          </motion.div>
          <motion.div
            variants={leftSideVariant}
            initial="initial"
            animate="enter"
            exit="exit"
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-48 my-1 bg-white rounded flex flex-col sm:ml-1 lg:m-0"
          >
            <div className="h-10 w-full rounded-t px-4">
              <div className="h-full w-full text-base font-semibold pt-3 border-b-2 border-gray-500">
                <p>Tài khoản COD</p>
              </div>
            </div>
            <div className="h-[6.5rem] px-4 flex items-center">
              <div className="relative flex flex-col h-full w-full py-3 pl-2">
                <span className="text-xs text-black font-bold whitespace-nowrap">Số dư hiện tại</span>
                <span className="text-xl text-black font-bold">{new Intl.NumberFormat('vi-VN', { currency: 'VND' }).format(customerInfo.CODBalance)}₫</span>
                <Link href="" className="absolute bottom-2 text-xs grow text-gray-700 whitespace-nowrap underline">Xem cách sử dụng</Link>
              </div>
              <div className="rounded-tl-full h-full pt-5 border-l-4 border-gray-500 pl-6"><GiPayMoney className="w-20 h-20 text-gray-500"/></div>
            </div>
            <div className="h-12 w-full border-t-[3px] border-gray-500 flex content-center py-2">
              <div className="ml-2 w-1/2 border-r-[1px] border-gray-300 pr-2"><motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => {setShowNotification3(true)}}
                  className="w-full h-full flex items-center justify-center"
              >
                <BsCashCoin className="mt-1 text-base"/>
                <p className="ml-2 font-bold text-sm ">Rút tiền</p>
              </motion.button></div>

              <div className="mr-2 w-1/2 pl-2"><motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  onClick={handleStatisticsClick}
                  className="w-full h-full flex items-center justify-center"
              >
                <RiPieChart2Fill className="text-lg text-gray-600"/>
                <p className="ml-1.5 font-bold text-sm">Thống kê</p>
              </motion.button></div>
            </div>
          </motion.div>
          <motion.div 
            variants={leftSideVariant} initial="initial" animate="enter" exit="exit"
            transition={{ duration: .5, delay: .4}}
            className="my-1 bg-white rounded flex flex-col sm:mr-1 lg:mr-0">
              <div className="h-10 w-full rounded-t px-4">
                <div className="h-full w-full text-base font-semibold pt-3 border-b-2 border-gray-500"><p>Tài khoản khác</p></div>
              </div>
              <div className="w-full rounded-b">
                <div className="relative w-full h-16 flex justify-start items-center">
                  <div className="absolute w-1/2 h-full border-b border-gray-300 left-1/2 -translate-x-1/2"></div>
                  <BsBank2 className="w-10 text-lg ml-2 text-blue-500"/>
                  <span className="text-sm font-semibold pr-16 xl:pr-0 text-blue-500">Tài khoản ngân hàng</span>
                  <div className="relative">
                    <button
                      onMouseEnter={showPopover}
                      onMouseLeave={hidePopover}
                      type="button"
                      data-popover-target="popover-right"
                    >
                      <svg
                        className="mt-2 ml-2 w-[0.9rem] h-[0.9rem] ms-2 text-gray-400 hover:text-gray-500 hidden xl:block"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </button>
                    <motion.div
                      variants={leftVariant}
                      initial="initial"
                      animate={controls}
                      exit="exit"
                      transition={{ duration: 0.5 }}
                      id="popover-right"
                      role="tooltip"
                      className={`-top-1/2 absolute z-10 ${
                        isPopoverVisible ? 'visible' : 'invisible'
                      } inline-block text-sm mt-4 text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800`}
                    >
                      <div className="px-2 py-1 bg-gray-100 border-b border-gray-200 rounded-lg dark:border-gray-600 dark:bg-gray-700">
                        <h3 className="font-medium text-xs text-gray-900 dark:text-white whitespace-nowrap">
                          Nhận tiền về tài khoản ngân hàng vào thứ ba hằng tuần
                        </h3>
                      </div>
                    </motion.div>
                  </div>
                  <motion.button
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      className="absolute h-6 right-4 px-1.5 bg-white hover:bg-gray-300 border-2 border-gray-300 text-gray-500 text-xs font-bold rounded"
                  >
                    Thêm
                  </motion.button>
                </div>
                <div className="relative w-full h-16 flex justify-start items-center">
                <BsCashStack className="w-10 text-lg ml-2 text-green-500"/>
                  <span className="text-sm font-semibold pr-14 lg:pr-0 text-green-500">Ví tiền mặt</span>
                  <div className="relative">
                    <button
                      onMouseEnter={showPopover2}
                      onMouseLeave={hidePopover2}
                      type="button"
                      data-popover-target="popover-right"
                    >
                      <svg
                        className="mt-2 ml-2 w-[0.9rem] h-[0.9rem] ms-2 text-gray-400 hover:text-gray-500 hidden xl:block"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </button>
                    <motion.div
                      variants={leftVariant}
                      initial="initial"
                      animate={controls2}
                      exit="exit"
                      transition={{ duration: 0.5 }}
                      id="popover-right"
                      role="tooltip"
                      className={`-top-1/2 absolute  ${
                        isPopoverVisible2 ? 'visible z-30' : 'hidden z-10'
                      } inline-block text-sm mt-4 text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800`}
                    >
                      <div className="px-2 py-1 bg-gray-100 border-b border-gray-200 rounded-lg dark:border-gray-600 dark:bg-gray-700">
                        <h3 className="font-medium text-xs text-gray-900 dark:text-white whitespace-nowrap">
                          Tiền sẽ được giao tới trong vòng 24h từ lúc tạo yêu cầu
                        </h3>
                      </div>
                    </motion.div>
                  </div>
                  <motion.button
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      className="absolute h-6 right-4 px-1.5 bg-white hover:bg-gray-300 border-2 border-gray-300 text-gray-500 text-xs font-bold rounded z-20"
                  >
                    Kích hoạt
                  </motion.button>
                </div>
              </div>
          </motion.div>
          <motion.div 
            variants={leftSideVariant} initial="initial" animate="enter" exit="exit"
            transition={{ duration: .5, delay: .6}}
            className="mt-1 mb-1 bg-white rounded ml-0 sm:ml-1 lg:ml-0">
              <div className="h-10 w-full rounded-t pl-4 pr-4">
                <div className="h-full w-full text-base font-semibold pt-3 border-b-2 border-gray-500"><p>Phương thức thanh toán</p></div>
              </div>
              <div className="w-full rounded-b">
              <div className="relative w-full h-16 flex justify-start items-center">
                  <div className="absolute w-1/2 h-full border-b border-gray-300 left-1/2 -translate-x-1/2"></div>
                  <SiZalo className="w-7 h-7 p-0.5 text-lg ml-4 mr-2 rounded-full border-2 border-gray-900 text-blue-600"/>
                  <span className="text-sm pr-16 xl:pr-0 flex text-blue-600 font-bold">Zalo<p className="text-white ml-0.5 px-1 rounded-sm bg-green-500">Pay</p></span>
                  <motion.button
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      className="absolute h-6 right-4 px-1.5 bg-white hover:bg-gray-300 border-2 border-gray-300 text-gray-500 text-xs font-bold rounded"
                  >
                    Liên kết
                  </motion.button>
                </div>
                <div className="relative w-full h-16 flex justify-start items-center">
                  <div className="absolute w-1/2 h-full border-b border-gray-300 left-1/2 -translate-x-1/2"></div>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="#F97316" stroke="#ffffff" className="w-7 h-7 p-0.5 ml-4 mr-2 text-lg rounded-full border-2 border-black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" viewBox="0 0 50 50">
                    <path d="m10.7031 13.4555h28.3281c1.7344 0 3.4688 1.7344 3.4688 3.4688v20.2344c0 1.7344-1.7344 3.4688-3.4688 3.4688h-30.0624c-1.7344 0-3.4688-1.7344-3.4688-3.4688v-23.7032c0-2.8906.5781-3.7578 2.8906-3.7578l24.8594-2.3125c2.0234-.1156 2.3125.5781 2.3125 1.4453v4.625"/>
                    <path d="m18.8304 34.0345c1.3342 1.0006 2.6683 1.3341 5.3366 1.3341h1.3342c2.3947 0 4.3359-1.9413 4.3359-4.3359s-1.9413-4.3359-4.3359-4.3359h-3.0019c-2.3947 0-4.3359-1.9413-4.3359-4.3359s1.9413-4.3359 4.3359-4.3359h1.3342c3.0017 0 4.3359.3336 5.3366 1.3342"/>
                  </svg>
                  <span className="text-sm font-bold pr-16 xl:pr-0 text-orange-500">ShopeePay</span>
                  <motion.button
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      className="absolute h-6 right-4 px-1.5 bg-white hover:bg-gray-300 border-2 border-gray-300 text-gray-500 text-xs font-bold rounded"
                  >
                    Liên kết
                  </motion.button>
                </div>
                <div className="relative w-full h-16 flex justify-start items-center">
                <FaCreditCard className="w-10 text-lg ml-2 text-green-600"/>
                  <span className="text-sm font-bold pr-14 lg:pr-0 text-green-600">Thêm thẻ mới</span>
                  <motion.button
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      className="absolute h-6 right-4 px-1.5 bg-white hover:bg-gray-300 border-2 border-gray-300 text-gray-500 text-xs font-bold rounded"
                  >
                    Thêm
                  </motion.button>
                </div>
              </div>
          </motion.div>
        </div>
        <div ref={scrollRef} className='static w-full grow lg:p-3 lg:pl-0 lg:h-[52.3rem]'>
          {currentForm == 0 && <motion.div 
            variants={rightSideVariant}
            initial="initial" animate="enter" transition={{ duration: .8 }}
            className="bg-white h-full lg:rounded-xl flex flex-col max-h-96 lg:max-h-full">
            <div className="h-14 w-full rounded-t-xl pl-4 pr-4">
              <div className="h-14 w-full text-black text-xl font-semibold pt-4 border-b-2 border-gray-500"><p>Lịch sử giao dịch</p></div>
            </div>
            <TradeHistory/>
          </motion.div>}
          {currentForm == 1 && <motion.div 
            variants={rightSideVariant}
            initial="initial" animate="enter" transition={{ duration: .8 }}
            className=" bg-white h-full lg:rounded-xl block">
            <div className="h-14 w-full rounded-t-xl pl-4 pr-4">
              <div className="h-full w-full text-black text-xl font-semibold pt-2 border-b-2 border-gray-500 flex">
                <motion.button
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    onClick={()=>{setCurrentForm(0)}}
                    className="w-8 h-8 mt-1 rounded-full hover:bg-gray-200 mb-2 flex items-center justify-center"
                >
                  <IoIosArrowBack className="text-2xl text-gray-600"/>
                </motion.button>
                <p className="mt-1.5 ml-4">Thống kê COD</p>
              </div>
            </div>
            <TradeHistory/>
          </motion.div>}
        </div>
        {showNotification && (
          <RechargeNotification onClose={handleNotificationClose} />
        )}

        {showNotification2 && (
          <CreditCardNotification customerInfo={customerInfo} onClose={handleNotificationClose2} />
        )}

        {showNotification3 && (   
          <WithdrawNotification onClose={handleNotificationClose3}/>
        )}
    </div>
  );
};

export default BalancePage;
