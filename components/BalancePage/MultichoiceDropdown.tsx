import React, { useState, useEffect, useRef } from 'react';
import { HiOutlineChevronDown } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';
import { MdOutlineRadioButtonChecked } from "react-icons/md";
import { MdRadioButtonUnchecked } from "react-icons/md";

interface DropdownProps {
  name: string;
  options: string[];
  selectedOptions1: string[];
  setSelectedOptions1: (selectedOptions1: string[]) => void;
}

const MultichoiceDropdown: React.FC<DropdownProps> = ({ name, options , selectedOptions1, setSelectedOptions1 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const handleOptionClick = (option: string) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((selectedOption) => selectedOption !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
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
    <div className="relative self-center w-20 sm:w-28 h-full">
      <motion.div className="relative flex w-full">
        <motion.button
          id={name}
          className={`h-6 self-center w-full border border-gray-300 rounded focus:outline-none 
                     focus:ring-2 placeholder-gray  text-left text-xs pl-2 pr-6 truncate focus:ring-blue-500 font-medium tracking-wide
                     ${selectedOptions.length ? 'text-black' : 'text-gray-500 uppercase'}`}
          onClick={toggleDropdown}
        >
          {selectedOptions.length ? selectedOptions.join(', ') : name}
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

        <AnimatePresence>
          {isOpen && (
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
                      className={`block h-9 text-sm border-b-[1px] z-20 text-left pl-2
                                ${index === options.length - 1
                          ? 'border-transparent hover:bg-gray-100 hover:rounded-b w-full'
                          : index === 0
                            ? 'border-gray-300 hover:bg-gray-100 hover:rounded-t w-full'
                            : 'border-gray-300 hover:bg-gray-100 w-full'
                        } ${selectedOptions.includes(option) ? 'text-blue-500' : 'text-gray-700'}`}
                        onClick={() => {
                            handleOptionClick(option)
                            if (selectedOptions1.includes(index.toString())) {
                                setSelectedOptions1(selectedOptions1.filter((selectedOption1) => selectedOption1 !== index.toString()));
                              } else {
                                setSelectedOptions1([...selectedOptions1, index.toString()]);
                              }
                          }}
                    >
                      {option}
                      <span className="absolute right-1.5 pt-1 invisible sm:visible">{selectedOptions.includes(option) ? <MdOutlineRadioButtonChecked className="w-3"/> : <MdRadioButtonUnchecked className="w-3"/>}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default MultichoiceDropdown;
