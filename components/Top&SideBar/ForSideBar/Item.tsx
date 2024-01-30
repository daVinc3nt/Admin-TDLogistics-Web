import { ListItemButton } from "@mui/material";
import Link from 'next/link'

interface MenuItem {
  title: string;
  url: string;
  icon: JSX.Element;
}

const Item: React.FC<MenuItem>  = (menuItems) => {
  return (
    <Link href={menuItems.url}>
    <div
    className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-red-600 text-white "
  >
    {menuItems.icon}
    <span className="text-xs lg:text-lg ml-4 text-gray-200 hidden md:block font-bold">{menuItems.title}</span>
  </div>
  </Link>
  );
};

export default Item;