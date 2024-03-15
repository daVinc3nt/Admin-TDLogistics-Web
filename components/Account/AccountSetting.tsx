import React from "react";
import { useState, useEffect } from "react";
import {
  UsersOperation,
  StaffsOperation,
  UpdatingPasswordsInfo,
  UpdatingStaffCondition,
} from "@/TDLib/tdlogistics";
import { Person } from "@mui/icons-material";
const AccountSetting = (info) => {
  const staff_id = info.info.staff_id;
  console.log("staff_id", staff_id);
  const userOp2 = new StaffsOperation();

  const [userInfo, setUserInfo] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      const res2 = await userOp2.getAuthenticatedStaffInfo();
      console.log("res2", res2);
      setUserInfo(res2.data);
    };
    fetchData();
  }, []);
  console.log("userinfo", userInfo);
  const [isEditInfo, setIsEditInfo] = useState(true);
  const [passwordInfo, setPasswordInfo] = useState({
    new_password: "",
    confirm_password: "",
  });
  const handleEditInfo = () => {
    setIsEditInfo(!isEditInfo);
  };
  const handleUpdateInfo = async () => {
    setIsEditInfo(!isEditInfo);
  };
  const handleChangePassword = async () => {
    const reponse = await userOp2.updatePassword(passwordInfo, staff_id);
    console.log("reponse", reponse);
    if (reponse.error === false) {
      alert("Đổi mật khẩu thành công");
    } else {
      alert("Đổi mật khẩu thất bại");
    }
  };

  return (
    <div className="flex flex-col gap-5  h-full bg-white pb-5">
      <div className="flex flex-col place-content-center mt-3">
        <div className="text-xl font-bold">Thông tin cá nhân</div>
        <div className="flex flex-col text-xs font-base mt-3">
          <div>
            <div className="text-xs font-semibold">Ảnh đại diện :</div>
          </div>
          <Person className="w-32 h-32" />
        </div>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-3 mt-3">
          <div className="flex flex-col text-xs font-base ">
            <div>
              <div className="text-xs font-semibold">Họ và tên :</div>
            </div>
            {!isEditInfo ? (
              <input
                type="text"
                className="flex place-content-center h-8 border  hover:bg-gray-100 focus:bg-slate-200 rounded-md w-full md:w-1/2 py-2 hover:border-gray-500 hover:shadow-md focus:outline-none pl-2 "
                placeholder="Nhập họ và tên mới"
              />
            ) : (
              <div className="text-xs font-base w-full md:w-1/2 py-2 pl-2">
                {userInfo.fullname}{" "}
              </div>
            )}
          </div>
          <div className="flex flex-col text-xs font-base ">
            <div>
              <div className="text-xs font-semibold">Số điện thoại :</div>
            </div>
            {!isEditInfo ? (
              <input
                type="text"
                className="flex place-content-center h-8 border  hover:bg-gray-100 focus:bg-slate-200 rounded-md w-full md:w-1/2 py-2 hover:border-gray-500 hover:shadow-md focus:outline-none pl-2 "
                placeholder="Nhập số điện thoại mới"
              />
            ) : (
              <div className="text-xs font-base w-full md:w-1/2 py-2 pl-2">
                {userInfo.phone_number}
              </div>
            )}
          </div>
          <div className="flex flex-col text-xs font-base">
            <div>
              <div className="text-xs font-semibold">CCCD :</div>
            </div>
            {!isEditInfo ? (
              <div>
                <input
                  type="text"
                  className="flex place-content-center h-8 border  hover:bg-gray-100 focus:bg-slate-200 rounded-md w-full md:w-1/2 py-2 hover:border-gray-500 hover:shadow-md focus:outline-none pl-2 "
                  placeholder="Nhập số CCCD mới"
                />
              </div>
            ) : (
              <div className="text-xs font-base w-full md:w-1/2 py-2 pl-2 ">
                {userInfo.cccd}
              </div>
            )}
          </div>

          <div className="flex flex-col text-xs font-base">
            <div>
              <div className="text-xs font-semibold">Chức vụ :</div>
            </div>
            <div className="text-xs font-base w-full md:w-1/2 py-2 pl-2">
              {userInfo.position}
            </div>
          </div>
          {/* <div className="flex flex-col text-xs font-base">
            <div>
              <div className="text-xs font-semibold">Giới tính :</div>
            </div>
            {!isEditInfo ? (
              <input
                type="text"
                className="flex place-content-center h-8 border  hover:bg-gray-100 focus:bg-slate-200 rounded-md w-1/2 py-2 hover:border-gray-500 hover:shadow-md focus:outline-none pl-2 "
                placeholder="Nam"
              />
            ) : (
              <div className="text-xs font-base w-1/2 py-2 pl-2">Nam</div>
            )}
          </div>
          <div className="flex flex-col text-xs font-base">
            <div>
              <div className="text-xs font-semibold">Địa chỉ :</div>
            </div>
            {!isEditInfo ? (
              <input
                type="text"
                className="flex place-content-center h-8 border  hover:bg-gray-100 focus:bg-slate-200 rounded-md w-1/2 py-2 hover:border-gray-500 hover:shadow-md focus:outline-none pl-2 "
                placeholder="123 Đường ABC, Quận 1, TP.HCM"
              />
            ) : (
              <div className="text-xs font-base w-1/2 py-2 pl-2">
                123 Đường ABC, Quận 1, TP.HCM
              </div>
            )}
          </div> */}
        </div>
        {/* {!isEditInfo ? (
          <div className="flex place-content-center ">
            <button
              onClick={handleUpdateInfo}
              className="mt-3 flex place-content-center bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded w-1/2 md:w-1/6"
            >
              Cập nhật
            </button>
            <button
              onClick={handleEditInfo}
              className="mt-3 flex place-content-center bg-gray-500 hover:bg-gray-400 text-white font-bold py-2 px-4 border-b-4 border-gray-700 hover:border-gray-500 rounded w-1/2 md:w-1/6"
            >
              Hủy bỏ
            </button>
          </div>
        ) : (
          <div className=" w-full  flex place-content-center">
            <button
              onClick={handleEditInfo}
              className="w-full md:w-1/3 mt-3 flex place-content-center bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
            >
              Chỉnh sửa thông tin cá nhân
            </button>
          </div>
        )} */}
      </div>
      <div className="flex flex-col place-content-center">
        <div className="text-xl font-bold">Cài đặt tài khoản</div>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-3 mt-3">
          <div>
            <div className="flex flex-col text-xs font-base">
              <div>
                <div className="text-xs font-semibold">Tên đăng nhập :</div>
              </div>
              <div className="text-xs font-base w-1/2 py-2 pl-2">nhacute</div>
            </div>
            <div className="flex flex-col text-xs font-base gap-2">
              <div>
                <div className="text-xs font-semibold">Đổi mật khẩu :</div>
              </div>
              <div>Mật khẩu mới</div>
              <input
                type="password"
                onChange={(e) =>
                  setPasswordInfo({
                    ...passwordInfo,
                    new_password: e.target.value,
                  })
                }
                className="w-full flex place-content-center h-8 border pl-2  hover:bg-gray-100 focus:bg-slate-200 rounded-md md:w-1/2 py-2 hover:border-gray-500 hover:shadow-md focus:outline-none "
              />
              <div>Xác nhận mật khẩu mới</div>
              <input
                type="password"
                onChange={(e) =>
                  setPasswordInfo({
                    ...passwordInfo,
                    confirm_password: e.target.value,
                  })
                }
                className="w-full flex place-content-center h-8 border pl-2  hover:bg-gray-100 focus:bg-slate-200 rounded-md md:w-1/2 py-2 hover:border-gray-500 hover:shadow-md focus:outline-none "
              />
            </div>
            <div className="flex  mt-3 w-full md:w-1/2 place-content-center">
              <button
                onClick={handleChangePassword}
                className="bg-transparent hover:bg-gray-500 text-gray-700 font-semibold hover:text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded"
              >
                Đổi mật khẩu
              </button>
            </div>
          </div>
          <div className="border p-3 rounded-md">
            <div className="font-bold text-red-600">Lưu ý:</div>
            <div className="font-extralight">
              Để đảm bảo an toàn tài khoản, mật khẩu mới cần đáp ứng các yêu cầu
              sau :
            </div>
            <div className="font-light">
              <ul>
                <li>* Chứa ít nhất 8 ký tự </li>
                <li>* Chứa ít nhất 1 ký tự viết hoa </li>
                <li>* Chứa ít nhất 1 ký tự viết thường </li>
                <li>* Chứa ít nhất 1 ký tự số </li>
                <li>* Chứa ít nhất 1 ký tự đặc biệt</li>
                <li> VD: NTd123@123</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AccountSetting;
