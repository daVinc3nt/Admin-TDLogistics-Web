import { useState } from "react";
import Item from "./Item";
import SubItems from "./SubItems";
interface MenuItem {
  title: string;
  url: string;
  icon: JSX.Element;
  submenus?: MenuItem[];
}

interface Props {
  menuItems: MenuItem[];
  toggleCollapseMobile: boolean;
}

export default function mDisplayItems({menuItems}) {
  const [dropdown, Setdropdown] = useState(false)
  return (

  <div className="h-screen z-50 top-0 bottom-0 flex flex-col w-80 p-2 overflow-y-auto text-center bg-gray-900">
    {/* logo */}
      <div className="text-gray-100 text-xl">
        <div className="p-2.5 mt-1 flex items-center">
          <i className="bi bi-app-indicator px-2 py-1 rounded-md bg-blue-600"></i>
          <h1 className="font-bold text-gray-200 text-[15px] ml-3">TDLogistics</h1>
          <i
            className="bi bi-x cursor-pointer ml-28 lg:hidden"
          ></i>
        </div>
        <div className="my-2 bg-gray-600 h-[1px]"></div>
      </div>

      {/* search */}
      <div
        className="p-2.5 flex items-center rounded-md px-4 duration-300 cursor-pointer bg-gray-700 text-white"
      >
        <i className="bi bi-search text-sm"></i>
        <input
          type="text"
          placeholder="Search"
          className="text-[15px] ml-4 w-full bg-transparent focus:outline-none"
        />
      </div>
      

      {menuItems.map((menu, index) => (
              menu.submenus? (
                <SubItems title={menu.title} url={menu.url} submenus={menu.submenus} icon={menu.icon} key={index} />
              ) : (
                <Item  title={menu.title} url={menu.url} icon={menu.icon} key={index} />
              )
          ))}


      <div
        className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
      >
        <i className="bi bi-box-arrow-in-right"></i>
        <span className="text-[15px] ml-4 text-gray-200 font-bold">Logout</span>
      </div>
      
  </div>

  );
}