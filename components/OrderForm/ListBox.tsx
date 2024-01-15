import React, { useState, useEffect, useRef } from 'react';
import { HiOutlineChevronDown } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';

const Dropdown = ({ name, options, selectedOption, setSelectedOption}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isAtBottom, setIsAtBottom] = useState(options.length < 5 ? true : false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    (isOpen) ? {} : setIsAtBottom(options.length < 5 ? true : false);
  };

  const closeDropdown = () => {
    setIsOpen(false);
    setIsAtBottom(options.length < 5 ? true : false);
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    closeDropdown();
    setIsAtBottom(options.length < 5 ? true : false);
  };

  const borderStyle: React.CSSProperties = {
    boxShadow: (isAtBottom)
      ? 'inset 0 0 5px 0 rgba(221, 221, 221, 0.8)'
      : 'inset 0 -4px 5px 0 rgba(221, 221, 221, 0.8)',
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
    <div className="relative self-center w-11/12 mt-2 mb-4">
      <motion.div className="relative flex w-full">
        <motion.button
          id={name}
          className={`h-12 self-center w-full border border-gray-300 rounded focus:outline-none 
                     focus:ring-2 text-left text-sm pl-3 truncate focus:ring-blue-500
                     ${selectedOption ? 'text-black ' : 'text-gray-600'}`}
          onClick={toggleDropdown}
        >
          {selectedOption || name}
        </motion.button>
        <AnimatePresence>
          <motion.button
            className={`flex absolute top-0 h-12 w-10 right-0 items-center pointer-event-stroke 
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
              className={`top-14 origin-center absolute w-full rounded shadow bg-white z-10`}
              onScroll={(e) => {
                const target = e.target as HTMLElement;
                if (target.scrollHeight - target.scrollTop === target.clientHeight) {
                  setIsAtBottom(true);
                } else {
                  setIsAtBottom(false);
                }
              }}
            >
              <ul
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
                className={`max-h-48 overflow-y-auto no-scrollbar rounded`}
                style={borderStyle}
                onScroll={(e) => {
                  const target = e.target as HTMLElement;
                  if (target.scrollHeight - target.scrollTop === target.clientHeight) {
                    setIsAtBottom(true);
                  } else {
                    setIsAtBottom(false);
                  }
                }}
              >
                {options.map((option, index) => (
                  <li key={index}>
                    <button
                      type="button"
                      className={`block h-12 text-sm text-gray-700 border-b-[1px] 
                                ${index === options.length - 1
                          ? 'border-transparent hover:bg-gray-100 hover:rounded-b w-full'
                          : index === 0
                            ? 'border-gray-300 hover:bg-gray-100 hover:rounded-t w-full'
                            : 'border-gray-300 hover:bg-gray-100 w-full'
                        }`}
                      onClick={() => handleOptionClick(option)}
                    >
                      {option}
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

export default Dropdown;
