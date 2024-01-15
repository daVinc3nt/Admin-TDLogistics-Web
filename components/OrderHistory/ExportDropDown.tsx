import React, { useState } from 'react';
import { LogoutIcon } from '../Icons';

const DropdownComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState('Ticket Box 1');
  const [selectedFormat, setSelectedFormat] = useState('.csv');

const handleTicketClick = (ticket: string) => {
    setSelectedTicket(ticket);
    setIsOpen(false);
  };

const handleFormatClick = (format: string) => {
    setSelectedFormat(format);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left z-50">
      <div className='m-2 bg-white text-black rounded w-35 flex items-center justify-center' style={{ width: "10.0rem" }}>
        <LogoutIcon />
        <button type="button" onClick={() => setIsOpen(!isOpen)}>
          Xuất dữ liệu
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <button onClick={() => handleTicketClick('Ticket Box 1')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Hôm nay</button>
            <button onClick={() => handleTicketClick('Ticket Box 2')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Tuần này</button>
            <button onClick={() => handleTicketClick('Ticket Box 3')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Tháng này</button>
          </div>
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <button onClick={() => handleFormatClick('.csv')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">.csv</button>
            <button onClick={() => handleFormatClick('.xlsx')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">.xlsx</button>
          </div>
          
        </div>
      )}
    </div>
  );
};

export default DropdownComponent;
