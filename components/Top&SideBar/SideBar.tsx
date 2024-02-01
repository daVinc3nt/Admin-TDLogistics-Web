import { useState } from "react";
import Side from './Side'
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
import MenuHambuger from "./MenuHambuger";
const SideItemData=[
  {
    id: 1,
    title:"Đơn hàng",
    url:"/dashboard/order",
    icon: <ReceiptLong className="scale-75 lg:block"/>
  },
  {
    id: 2,
    title:"Lô hàng",
    url:"/dashboard/consignment",
    icon:<Inventory className="scale-75 lg:block"/>
  },
  {
    id: 3,
    title:"Nội vụ",
    icon:<Assistant className="scale-75 lg:block"/>,
    submenus:[
      {
        id: 4,
        title:"Nhân viên",
        url:"/dashboard/staff",
        icon:<People className="scale-75 lg:block"/>
      },
      {
        id: 5,
        title:"Thống kê",
        url:"/dashboard/",
        icon:<PieChart className="scale-75 lg:block"/>
      },
      {
        id: 6,
        title:"Lịch trình",
        url:"/dashboard",
        icon:<PendingActions className="scale-75 lg:block"/>
      },
      {
        id: 7,
        title:"Phương Tiện",
        url:"/dashboard/vehicle",
        icon:<LocalShipping className="scale-75 lg:block"/>
      },
    ]
  },
  {
    id: 8,
    title:"Đa nhiệm",
    icon:<BusinessCenter className="scale-75 lg:block"/>,
    submenus:[
      {
        id: 9,
        title:"Quản lý mail",
        url:"/dashboard/email",
        icon:<AlternateEmail className="scale-75 lg:block"/>
      },
      {
        id: 10,
        title:"Quản lý file",
        url:"/dashboard/file",
        icon:<Folder className="scale-75 lg:block"/>
      }
    ]
  },
]
export default function SideBar({toggleCollapseMobile}) {
  const [dropdown, Setdropdown] = useState(false)
  return (
    <Side menuItems={SideItemData} toggleCollapseMobile={toggleCollapseMobile}/>
  );
}