import { motion, AnimatePresence } from 'framer-motion';
import React, { useState, useEffect, useRef } from 'react';
import { HiOutlineChevronDown } from 'react-icons/hi';
import { MdOutlineRadioButtonChecked, MdRadioButtonUnchecked } from 'react-icons/md';

interface Option {
  label: string;
  value: string;
}

interface SinglechoiceDropdownProps {
  name: string;
  options: Option[];
  selectedOption: string | null;
  setSelectedOption: (selectedOption: string | null) => void;
}

const SinglechoiceDropdown: React.FC<SinglechoiceDropdownProps> = ({ name, options, selectedOption, setSelectedOption }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const handleOptionClick = (value: string) => {
    setSelectedOption(value);
    closeDropdown();
  };

  const getSelectedValue = () => {
    const selectedOptionObject = options.find((option) => option.value === selectedOption && option.value !== "all");
    return selectedOptionObject ? selectedOptionObject.label : name;
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        event.target &&
        !dropdownRef.current.contains(event.target as HTMLElement) &&
        ((event.target as HTMLElement).id !== name)
      ) {
        closeDropdown();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative hidden sm:block w-28 h-full">
      <div className="relative flex">
        <motion.button
          id={name}
          className={`h-6 self-center w-full border border-gray-300 rounded focus:outline-none 
                     focus:ring-2 placeholder-gray  text-left text-xs pl-2 pr-6 truncate focus:ring-blue-500 font-medium tracking-wide
                     ${selectedOption && selectedOption !=="all" ? 'text-black' : 'text-gray-500 uppercase'}`}
          onClick={toggleDropdown}
        >
          {getSelectedValue()}
        </motion.button>
        <AnimatePresence>
          <motion.button
            className={`flex absolute top-0 h-6 w-6 right-0 items-center pointer-event-stroke 
                      -translate-y-1/2 rounded-r-xl`}
            id={name}
            onClick={toggleDropdown}
            initial={{ rotate: 0 }}
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <HiOutlineChevronDown id={name} className="text-gray-400 w-full" />
          </motion.button>
        </AnimatePresence>
        <AnimatePresence>{isOpen && (
          <motion.div
          ref={dropdownRef}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={{ initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.9 } }}
          transition={{ duration: 0.3 }}
          className={`origin-center top-7 absolute w-full rounded  bg-white border-[1px] border-gray-300`}
          >
            <ul
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
              className={`max-h-45 overflow-y-auto no-scrollbar rounded z-10`}
            >
              {options.map((option, index) => (
                <li key={index}>
                  <button
                    type="button"
                    className={`block h-8 text-sm border-b-[1px] z-20 text-left pl-2
                                ${index === options.length - 1
                                  ? 'border-transparent hover:bg-gray-100 hover:rounded-b w-full'
                                  : index === 0
                                    ? 'border-gray-300 hover:bg-gray-100 hover:rounded-t w-full'
                                    : 'border-gray-300 hover:bg-gray-100 w-full'
                                } ${selectedOption === option.value ? 'text-blue-500' : 'text-gray-700'}`}
                    onClick={() => handleOptionClick(option.value)}
                  >
                    {option.label}
                    <span className="absolute right-1.5 pt-1">{selectedOption === option.value ? <MdOutlineRadioButtonChecked className="w-3"/> : <MdRadioButtonUnchecked className="w-3"/>}</span>
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )} </AnimatePresence>
      </div>
    </div>
  );
};

export default SinglechoiceDropdown;
