import React, { ReactNode, useState } from "react";
import Sidebar from "./Sidebar";
import MobileMenu from "./NavigationBar/MobileMenu";
import {
  NotifyIcon,
  GlobseIcon
} from "../components/Icons"
import LangSelector from "@/components/LangSelector/LangSelector";
import { FaCarSide } from "react-icons/fa";
interface LayoutProps {
  children: ReactNode;
} 
//reactNode is a dataType of react, its can be JSX, 
//component or any fragment

const Wrapper = ({ children }: LayoutProps) => {
  const [toggleCollapseMobile, setToggleCollapseMobile] = useState(false);
  const handleSidebarToggleMobile = () => {
    setToggleCollapseMobile(!toggleCollapseMobile);
  };
  return (
    <div className="flex ">
      <Sidebar toggleCollapseMobile={toggleCollapseMobile}/>
      <div className="flex-1 flex flex-col h-screen bg-red-800">
        <div className="flex flex-col">
          <header className="h-12 flex justify-end w-full items-center px-4 xl:px-2">
            <div className="flex items-center">
                <div className="flex items-center">
                  <div className="flex md:flex-row-reverse flex-row gap-2">
                    <LangSelector/>
                    <NotifyIcon/>
                  </div>
                    <MobileMenu toggle ={handleSidebarToggleMobile}/>
                </div>
            </div>
          </header>
        </div>
        {!toggleCollapseMobile && 
        <div className="lg:hidden flex-1 flex z-40 fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm">
        </div>}

        <div className="bg-primary flex flex-1 text-black">
            {children}
        </div>
      </div>
    </div>
  );
};

export default Wrapper;
