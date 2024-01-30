import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useMemo } from "react";
import { motion, Variants } from "framer-motion";
import { FormattedMessage, useIntl } from "react-intl";
import Item from "./ForSideBar/Item";
import SubItems from "./ForSideBar/SubItems"; 
import {ReceiptLong,
  Inventory,
  Assistant,
  People,
  PieChart,
  PendingActions,
  LocalShipping,
  BusinessCenter,
  AlternateEmail,
  Folder,
  LogoutOutlined
}from '@mui/icons-material';

interface MyComponentProps {
  toggleCollapseMobile: boolean;
}
interface MenuItem {
  id:number;
  title: string;
  url: string;
  icon: JSX.Element;
  submenus?: MenuItem[];
}

interface Props {
  menuItems: MenuItem[];
  toggleCollapseMobile: boolean;
}
const Sidebar: React.FC<Props> = ({menuItems, toggleCollapseMobile })  => {
  const [toggleCollapse, setToggleCollapse] = useState(false);
  const [isCollapsible, setIsCollapsible] = useState(false);
  const router = useRouter();
  const intl = useIntl();

  const activeMenu = useMemo(
    () => menuItems.find((menu) => menu.url === router.pathname),
    [router.pathname]
  );

  const leftSideVariant: Variants = {
    initial: { x: 20, opacity: 0 },
    enter: { x: 0, opacity: 1 },
    exit: { x: -20, opacity: 0 }
  }

  const leftSideVariantMobile: Variants = {
    initial: { x: 5, opacity: 0 },
    enter: { x: 0, opacity: 1 },
    exit: { x: -5, opacity: 0 }
  }

  const wrapperClasses = classNames(
    "h-screen hidden lg:px-4 lg:flex pt-8 pb-4 bg-ligth justify-between flex-col",
    {
      ["lg:w-80"]: !toggleCollapse,
      ["lg:w-20"]: toggleCollapse,
    }
  );
  const wrapperClassesMobile = classNames(
    "h-screen flex z-50 fixed overflow-y-scroll lg:hidden px-4 pt-8 pb-4 bg-light justify-between flex-col",
    {
      ["w-52"]: !toggleCollapseMobile,
      ["w-0 px-0"]: toggleCollapseMobile,
    }
  );

  const collapseIconClasses = classNames(
    "p-4 rounded bg-light-lighter absolute right-0 hidden lg:block",
    {
      "rotate-180": toggleCollapse,
    }
  );

  const getNavItemClasses = (menu : any) => {
    return classNames(
      "flex items-center cursor-pointer hover:bg-light-lighter rounded w-full overflow-hidden whitespace-nowrap",
      {
        ["bg-light-lighter"]: activeMenu?.id === menu.id,
      }
    );
  };

  const onMouseOver = () => {
    setIsCollapsible(!isCollapsible);
  };

  const handleSidebarToggle = () => {
    setToggleCollapse(!toggleCollapse);
  };
  // const handleSidebarToggleMobile = () => {
  //   setToggleCollapseMobile(!toggleCollapseMobile);
  // };

  return (
    <>
    <div
      className={wrapperClasses}
      onMouseEnter={onMouseOver}
      onMouseLeave={onMouseOver}
      style={{ transition: "width 200ms cubic-bezier(0.2, 0, 0, 1) 0s" }}
    >
      <div className="flex flex-col">
        <div className="flex  items-center justify-between relative">
          <div className="flex items-center pl-1 gap-4">
            {/* <LogoIcon /> */}
            {!toggleCollapse && <motion.span
              variants={leftSideVariant} initial="initial" animate="enter"
              transition={{ duration: 0.5, delay: 0.2 }}
              className={classNames("mt-2 text-2xl font-bold text-text")}
            >
              TDLogistics
            </motion.span>}
          </div>
          {isCollapsible && (
            <button
              className={collapseIconClasses}
              onClick={handleSidebarToggle}
            >
            </button>
          )}
        </div>

           {menuItems.map((menu, index) => {
            const classes = getNavItemClasses(menu);
            return (
              <div key={menu.id} className={classes}>
                {menu.submenus? (
                <SubItems title={menu.title} url={menu.url} submenus={menu.submenus} icon={menu.icon} key={index} />
              ) : (
                <Item  title={menu.title} url={menu.url} icon={menu.icon} key={index} />
              )}
              </div>
            );
          })}

      </div>

      <div className={`${getNavItemClasses({})}`}>
        <div className="flex py-4 px-3 items-center w-full h-full">
          <div style={ !toggleCollapse? { width: "2.5rem" }: { width: "0rem" }}>
            <LogoutOutlined />
          </div>
          {!toggleCollapse && (
            <span
              className={classNames(
                "text-md font-medium text-black"
              )}
            >
              <FormattedMessage id="Sidebar.option6"/>
            </span>
          )}
        </div>
      </div>
    </div>
    
    {/* <div
      className={wrapperClassesMobile}
      onMouseEnter={onMouseOver}
      onMouseLeave={onMouseOver}
      style={{ transition: "width 200ms cubic-bezier(0.2, 0, 0, 1) 0s" }}
    >
      <div className="flex flex-col">
        <div className="flex items-center justify-between relative">
          <div className="flex items-center pl-1 gap-2">
            {!toggleCollapseMobile && <motion.span
              variants={leftSideVariantMobile} initial="initial" animate="enter"
              transition={{ duration: 0.5, delay: 0.2 }}
              className={classNames("mt-2 text-xl font-bold text-text", {
              hidden: toggleCollapseMobile,
              })}
            >
              TDLogistics
            </motion.span>}
          </div>
          {isCollapsible && (
            <button
              className={collapseIconClasses}
              onClick={handleSidebarToggle}
            >
              <CollapsIcon />
            </button>
          )}
        </div>

        {!toggleCollapseMobile && (
        <div className="flex rounded-lg items-center mt-10 p-2 w-full h-24 bg-LitghRedGradient">
          <div style={!toggleCollapseMobile? { width: "5rem" }: { width: "0rem" }}>
            <motion.img
              variants={leftSideVariantMobile} initial="initial" animate="enter" exit="exit"
              transition={{ duration: .7 }}
              className="rounded-full object-cover"
              src={"/SunGlass.jpg"}
              alt=""
              width="60"
              height="60"
            />
          </div>
          {!toggleCollapseMobile && (
          <div className="flex flex-col">
            <motion.span 
              variants={leftSideVariant} initial="initial" animate="enter" exit="exit"
              transition={{ duration: .7 }}
              className="font-bold text-md text-white whitespace-nowrap">Trần Vĩ Quang</motion.span>
            <motion.span 
              variants={leftSideVariant} initial="initial" animate="enter" exit="exit"
              transition={{ duration: .7 }}
              className="text-xs text-white whitespace-nowrap"><FormattedMessage id="Sidebar.member"/></motion.span>
          </div>
          )}
        </div>
        )}

        <div className={`flex flex-col items-start ${!toggleCollapseMobile?'mt-10':'mt-44'}`}>
          {menuItems.map(({ icon: Icon, ...menu }) => {
            const classes = getNavItemClasses(menu);
            return (
              <div key={menu.id} className={classes}>
                <Link href={menu.link} className="w-full"> 
                <div className="flex py-4 px-[0.6rem] items-center w-full h-full">
                    <div style={!toggleCollapseMobile? { width: "2.5rem" }: { width: "0rem", display: "false"}}>
                      <Icon />
                    </div>
                    {!toggleCollapseMobile && (
                      <span
                        className={classNames(
                          "text-md font-medium text-black"
                        )}
                      >
                        {menu.label}
                      </span>
                    )}
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      <div className={`${getNavItemClasses({})}`}>
        <div className="flex py-4 px-3 items-center w-full h-full">
        {!toggleCollapseMobile && <div style={ { width: "2.5rem" }}>
            <LogoutIcon />
          </div>}
          {!toggleCollapseMobile && (
            <span
              className={classNames(
                "text-md font-medium text-black"
              )}
            >
             <FormattedMessage id="Sidebar.option6"/>
            </span>
          )}
        </div>
      </div>
    </div> */}
    </>
  );
};

export default Sidebar;
