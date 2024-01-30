import { useState } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DisplayItems from './ForSideBar/DisplayItems'
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
    title:"Đơn hàng",
    url:"/",
    icon: <LogoutOutlined className="scale-75 lg:block"/>
  },
  {
    title:"Lô hàng",
    url:"/",
    icon:<Inventory className="scale-75 lg:block"/>
  },
  {
    title:"Nội vụ",
    icon:<Assistant className="scale-75 lg:block"/>,
    submenus:[
      {
        title:"Nhân viên",
        url:"/",
        icon:<People className="scale-75 lg:block"/>
      },
      {
        title:"Thống kê",
        url:"/",
        icon:<PieChart className="scale-75 lg:block"/>
      },
      {
        title:"Lịch trình",
        url:"/",
        icon:<PendingActions className="scale-75 lg:block"/>
      },
      {
        title:"Phương Tiện",
        url:"/",
        icon:<LocalShipping className="scale-75 lg:block"/>
      },
    ]
  },
  {
    title:"Đa nhiệm",
    url:"/",
    icon:<BusinessCenter className="scale-75 lg:block"/>,
    submenus:[
      {
        title:"Gửi mail",
        url:"/",
        icon:<AlternateEmail className="scale-75 lg:block"/>
      },
      {
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
    <DisplayItems menuItems={SideItemData}/>
  );
}