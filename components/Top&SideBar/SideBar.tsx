import { useState } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DisplayItems from './ForSideBar/DisplayItems'
import Sidebar from './Side'
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
const SideItemData=[
  {
    id: 1,
    title:"Đơn hàng",
    url:"/",
    icon: <LogoutOutlined className="scale-75 lg:block"/>
  },
  {
    id: 2,
    title:"Lô hàng",
    url:"/",
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
        url:"/",
        icon:<People className="scale-75 lg:block"/>
      },
      {
        id: 5,
        title:"Thống kê",
        url:"/",
        icon:<PieChart className="scale-75 lg:block"/>
      },
      {
        id: 6,
        title:"Lịch trình",
        url:"/",
        icon:<PendingActions className="scale-75 lg:block"/>
      },
      {
        id: 7,
        title:"Phương Tiện",
        url:"/",
        icon:<LocalShipping className="scale-75 lg:block"/>
      },
    ]
  },
  {
    id: 8,
    title:"Đa nhiệm",
    url:"/",
    icon:<BusinessCenter className="scale-75 lg:block"/>,
    submenus:[
      {
        id: 9,
        title:"Gửi mail",
        url:"/",
        icon:<AlternateEmail className="scale-75 lg:block"/>
      },
      {
        id: 10,
        title:"Quản lý file",
        url:"/",
        icon:<Folder className="scale-75 lg:block"/>
      }
    ]
  },
]
export default function SideBar() {
  const [dropdown, Setdropdown] = useState(false)
  return (
    <Sidebar menuItems={SideItemData}/>
  );
}