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
        Folder
}from '@mui/icons-material';
const SideItemData=[
  {
    title:"Đơn hàng",
    url:"/",
    icon:<ReceiptLong />
  },
  {
    title:"Lô hàng",
    url:"/",
    icon:<Inventory />
  },
  {
    title:"Nội vụ",
    icon:<Assistant />,
    submenus:[
      {
        title:"Nhân viên",
        url:"/",
        icon:<People />
      },
      {
        title:"Thống kê",
        url:"/",
        icon:<PieChart />
      },
      {
        title:"Lịch trình",
        url:"/",
        icon:<PendingActions />
      },
      {
        title:"Phương Tiện",
        url:"/",
        icon:<LocalShipping />
      },
    ]
  },
  {
    title:"Đa nhiệm",
    url:"/",
    icon:<BusinessCenter />,
    submenus:[
      {
        title:"Gửi mail",
        url:"/",
        icon:<AlternateEmail/>
      },
      {
        title:"Quản lý file",
        url:"/",
        icon:<Folder />
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