import React from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { useState } from "react";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
interface CustomDropdownProps {
  label: string;
  options: string[];
  selectedOption: string;
  onSelectOption: (option: string) => void;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  label,
  options,
  selectedOption,
  onSelectOption,
}) => {
  const [selected, setSelected] =useState(label)
  return (
    <>
    <Dropdown className="z-50">
      <DropdownTrigger>
        <Button
          className="text-xs md:text-sm border border-gray-600 rounded h-10 w-full"
          aria-label={label}
        >
          {selected}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        className="bg-[#1a1b23] border border-gray-300 no-scrollbar rounded w-full max-h-80 overflow-y-auto"
        aria-labelledby="dropdownMenuButton"
      >
        {options.map((option, index) => (
          <DropdownItem key={index} textValue={option}>
            <Button
              onClick={() => {onSelectOption(option); setSelected(option)}}
              aria-label={option}
              className="text-center text-white w-full"
            >
              {option}
            </Button>
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
    </>
  );
};

export default CustomDropdown;
