import React from "react";
import { useState, useEffect } from "react";
import {
  UsersOperation,
  StaffsOperation,
  UpdatingPasswordsInfo,
  AdministrativeInfo,
  UpdatingStaffCondition,
  AdministrativeOperation,
  FindingAvatarCondition,
  UpdatingAvatarStaffInfo,
} from "@/TDLib/tdlogistics";
import { Person } from "@mui/icons-material";
import BackupIcon from "@mui/icons-material/Backup";
import { user } from "@nextui-org/react";
import { useIntl, FormattedMessage } from "react-intl";
import { set } from "date-fns";
const AccountSetting = (info) => {
  const intl = useIntl();
  const [staff_id, setStaff_id] = useState("");
  const userOp2 = new StaffsOperation();
  const [staffInfo, setStaffInfo] = useState([]);

  const [avatar, setAvatar] = useState(null);
  const [Update, setUpdate] = useState({
    fullname: "",
    username: "",
    date_of_birth: "",
    email: "",
    phone_number: "",
    role: "",
    salary: 0,
    paid_salary: "",
    province: "",
    district: "",
    town: "",
    detail_address: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      const res2 = await userOp2.getAuthenticatedStaffInfo();
      console.log("res2", res2);
      setStaff_id(res2.data.staff_id);
      setStaffInfo(res2.data);
      setUpdate({
        fullname: res2.data.fullname,
        username: res2.data.username,
        date_of_birth: res2.data.date_of_birth,
        email: res2.data.email,
        phone_number: res2.data.phone_number,
        role: res2.data.role,
        salary: res2.data.salary,
        paid_salary: res2.data.paid_salary,
        province: res2.data.province,
        district: res2.data.district,
        town: res2.data.town,
        detail_address: res2.data.detail_address,
      });
      const get: FindingAvatarCondition = {
        staff_id: res2.data.staff_id,
      };
      console.log("get", get);
      const url = await userOp2.getAvatar(get);
      console.log("AVT", url);
      setAvatar(url);
    };
    fetchData();
  }, []);

  const [isEditInfo, setIsEditInfo] = useState(true);
  const [passwordInfo, setPasswordInfo] = useState({
    new_password: "",
    confirm_password: "",
  });
  const adminOperation = new AdministrativeOperation();
  const a: AdministrativeInfo = {
    province: "",
  };
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");

  const handleInputChange = (key: string, value: any) => {
    setUpdate((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };
  useEffect(() => {
    const fetchData = async () => {
      const response = await adminOperation.get({});
      console.log("Tỉnh", response);
      setProvinces(response.data);
    };
    fetchData();
  }, []);
  const handleProvinceChange = async (e) => {
    setSelectedProvince(e.target.value);
    a.province = e.target.value;
    handleInputChange("province", e.target.value);
    console.log(a);
    const response = await adminOperation.get(a);
    console.log("Quận", response);
    setDistricts(response.data);
  };

  const handleDistrictChange = async (e) => {
    setSelectedDistrict(e.target.value);
    a.province = selectedProvince;
    a.district = e.target.value;
    handleInputChange("district", e.target.value);
    console.log(a);
    const response = await adminOperation.get(a);
    console.log("Xã", response);
    setWards(response.data);
  };
  const handleWardChange = (e) => {
    setSelectedWard(e.target.value);
    handleInputChange("town", e.target.value);
  };

  const handleEditInfo = () => {
    setIsEditInfo(!isEditInfo);
  };
  const handleUpdateInfo = async () => {
    console.log("iddddd", staff_id);
    console.log("update", Update);
    const Staffcondition: UpdatingStaffCondition = {
      staff_id: staff_id,
    };
    const response = await userOp2.update(Update, Staffcondition);
    console.log("response", response);
    if (response.error === false) {
      alert("Cập nhật thông tin thành công");
    } else {
      alert(response.message);
    }
    setIsEditInfo(!isEditInfo);
  };
  const handleChangePassword = async () => {
    const up: UpdatingStaffCondition = {
      staff_id: staff_id,
    };

    const reponse = await userOp2.updatePassword(passwordInfo, up);
    console.log("reponse", reponse);
    if (reponse.error === false) {
      alert("Đổi mật khẩu thành công");
    } else {
      alert("Đổi mật khẩu thất bại");
    }
  };
  const [avaterUpload, setAvaterUpload] = useState(null);
  const handleUpdateAvatar = async () => {
    const staffInfo: UpdatingAvatarStaffInfo = {
      avatarFile: avaterUpload,
    };
    const id: UpdatingStaffCondition = {
      staff_id: staff_id,
    };
    const response = await userOp2.updateAvatar(staffInfo, id);
    console.log("response", response);
    if (response.error === false) {
      alert("Cập nhật ảnh đại diện thành công");
    } else {
      alert("Cập nhật ảnh đại diện thất bại");
    }
  };
  return (
    <div className="flex flex-col gap-5  h-full bg-white pb-5">
      <div className="flex flex-col place-content-center mt-3">
        <div className="text-xl font-bold">Thông tin cá nhân</div>
        <div className="flex flex-col text-xs font-base gap-3 ">
          <div>
            <div className="text-sm font-light">Ảnh đại diện :</div>
            <div className=" flex flex-row place place-content-center  border-2 h-20 border-blue-200  rounded-lg mt-3">
              {avatar && (
                <div className="pl-5 py-2 w-20 h-20 ">
                  <img
                    src={avatar}
                    alt="Avatar"
                    className="h-14 bg-white border rounded"
                  />
                </div>
              )}
              {!avatar && (
                <div className="pl-5 py-2 w-20 h-20 ">
                  <Person className=" h-16 bg-white border rounded-xl" />
                </div>
              )}
              <div className="flex-grow place-content-center ">
                <label className="flex py-6">
                  <BackupIcon className="h-6 w-6" />

                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      setAvaterUpload(file);
                    }}
                  />
                  {avaterUpload && (
                    <div className="ml-3 font-bold text-sm">
                      {avaterUpload.name}
                    </div>
                  )}
                  {!avaterUpload && (
                    <div className="ml-3 font-bold text-sm">Tải ảnh lên</div>
                  )}
                </label>
              </div>
            </div>
          </div>
          <button
            onClick={handleUpdateAvatar}
            className="text-white place-items-center h-8 mt-2 w-20 font-bold rounded-lg bg-blue-500 hover:bg-blue-400"
          >
            Xác nhận
          </button>
        </div>

        <div className="grid md:grid-cols-2 grid-cols-1 gap-3 mt-3">
          <div className="flex flex-col text-xs font-base gap-3 gap-3">
            <div>
              <div className="text-sm font-light">Họ và tên :</div>
            </div>
            {!isEditInfo ? (
              <input
                type="text"
                className="flex place-content-center text-base h-8 font-normal border-b-blue-600 border-b  hover:bg-blue-50 focus:bg-blue-100 shadow-sm w-full  py-2 hover:border-blue-500 hover:shadow-md focus:outline-none pl-2 "
                placeholder="Nhập họ và tên mới"
                value={Update.fullname}
              />
            ) : (
              <div className="flex text-base h-8 font-normal border-b-blue-600 border-b  hover:bg-blue-50 focus:bg-blue-100 shadow-sm w-full  py-2 hover:border-blue-500 hover:shadow-md focus:outline-none pl-2">
                {Update.fullname}{" "}
              </div>
            )}
          </div>
          <div className="flex flex-col text-xs font-base gap-3 gap-3">
            <div>
              <div className="text-sm font-light">Số điện thoại :</div>
            </div>
            {!isEditInfo ? (
              <input
                type="text"
                className="flex place-content-center text-base h-8 font-normal border-b-blue-600 border-b  hover:bg-blue-50 focus:bg-blue-100 shadow-sm w-full  py-2 hover:border-blue-500 hover:shadow-md focus:outline-none pl-2"
                placeholder="Nhập số điện thoại mới"
                value={Update.phone_number}
              />
            ) : (
              <div className="flex  text-base h-8 font-normal border-b-blue-600 border-b  hover:bg-blue-50 focus:bg-blue-100 shadow-sm w-full  py-2 hover:border-blue-500 hover:shadow-md focus:outline-none pl-2">
                {Update.phone_number}
              </div>
            )}
          </div>
          <div className="flex flex-col text-xs font-base gap-3 ">
            <div>
              <div className="text-sm font-light">CCCD :</div>
            </div>
            {!isEditInfo ? (
              <div>
                <input
                  type="text"
                  className="flex place-content-center text-base h-8 font-normal border-b-blue-600 border-b  hover:bg-blue-50 focus:bg-blue-100 shadow-sm w-full  py-2 hover:border-blue-500 hover:shadow-md focus:outline-none pl-2"
                  placeholder="Nhập số CCCD mới"
                  value={staffInfo.cccd}
                />
              </div>
            ) : (
              <div className="flex text-base h-8 font-normal border-b-blue-600 border-b  hover:bg-blue-50 focus:bg-blue-100 shadow-sm w-full  py-2 hover:border-blue-500 hover:shadow-md focus:outline-none pl-2 ">
                {staffInfo.cccd}
              </div>
            )}
          </div>

          <div className="flex flex-col text-xs font-base gap-3">
            <div>
              <div className="text-sm font-light">Chức vụ :</div>
            </div>
            <div className="flex  text-base h-8 font-normal border-b-blue-600 border-b  hover:bg-blue-50 focus:bg-blue-100 shadow-sm w-full  py-2 hover:border-blue-500 hover:shadow-md focus:outline-none pl-2">
              {Update.role}
            </div>
          </div>
          <div className="flex flex-col text-xs font-base gap-3">
            <div>
              <div className="text-sm font-light">Email :</div>
            </div>
            {!isEditInfo ? (
              <input
                type="text"
                className="flex place-content-center text-base h-8 font-normal border-b-blue-600 border-b  hover:bg-blue-50 focus:bg-blue-100 shadow-sm w-full  py-2 hover:border-blue-500 hover:shadow-md focus:outline-none pl-2"
                placeholder="Nhập email mới"
                value={Update.email}
              />
            ) : (
              <div className="flex  text-base h-8 font-normal border-b-blue-600 border-b  hover:bg-blue-50 focus:bg-blue-100 shadow-sm w-full  py-2 hover:border-blue-500 hover:shadow-md focus:outline-none pl-2">
                {Update.email}
              </div>
            )}
          </div>
          <div className="flex flex-col text-xs font-base gap-3">
            <div>
              <div className="text-sm font-light">Ngày sinh :</div>
            </div>

            <div className="flex text-base h-8 font-normal border-b-blue-600 border-b  hover:bg-blue-50 focus:bg-blue-100 shadow-sm w-full  py-2 hover:border-blue-500 hover:shadow-md focus:outline-none pl-2">
              {Update.date_of_birth}
            </div>
          </div>

          {/* <div className="flex flex-col text-xs font-base gap-3">
            <div>
              <div className="text-sm font-light">Giới tính :</div>
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
          <div className="flex flex-col text-xs font-base gap-3">
            <div>
              <div className="text-sm font-light">Địa chỉ :</div>
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
        <div className="flex flex-row text-xs font-base h-10 mt-3">
          <div className="text-sm font-light w-20">Địa chỉ:</div>

          {!isEditInfo ? (
            <div className="flex flex-row w-full">
              <select
                className={` text-xs md:text-base  border border-gray-600 rounded  dark:bg-[#14141a] h-7  w-full
                `}
                id="city"
                aria-label=".form-select-sm"
                value={selectedProvince}
                onChange={handleProvinceChange}
              >
                <option value="Bình Định">
                  {intl.formatMessage({ id: "Choose Province" })}
                </option>
                {provinces.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              <select
                className={` text-xs md:text-base  border border-gray-600 rounded  dark:bg-[#14141a] h-7  w-full
                
                `}
                id="user_district"
                aria-label=".form-select-sm"
                value={selectedDistrict}
                onChange={handleDistrictChange}
              >
                <option value="Hoài Ân">
                  {intl.formatMessage({ id: "Choose District" })}
                </option>
                {districts.map((user_district) => (
                  <option key={user_district} value={user_district}>
                    {user_district}
                  </option>
                ))}
              </select>
              <select
                className={` text-xs md:text-base  border border-gray-600 rounded  dark:bg-[#14141a] h-7  w-full
                `}
                id="ward"
                aria-label=".form-select-sm"
                value={selectedWard}
                onChange={(e) => handleWardChange(e)}
              >
                <option value="Tăng Bạt Hổ">
                  {intl.formatMessage({ id: "Choose Ward" })}
                </option>
                {wards.map((ward) => (
                  <option key={ward} value={ward}>
                    {ward}
                  </option>
                ))}
              </select>

              <input
                type=""
                className={` text-xs md:text-base  border border-gray-600 rounded  dark:bg-[#14141a] h-7  w-full
                `}
                placeholder="Số nhà- tên đường"
                onChange={(e) =>
                  handleInputChange("user_detail_address", e.target.value)
                }
              />
            </div>
          ) : (
            <div className="text-base font-base w-full ">
              {Update.detail_address}
              {Update.town}
              {Update.district}
              {Update.province}
            </div>
          )}
        </div>
        {!isEditInfo ? (
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
        )}
      </div>
      <div className="flex flex-col place-content-center">
        <div className="text-xl font-bold">Cài đặt tài khoản</div>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-5 mt-3">
          <div>
            <div className="flex flex-col text-xs font-base gap-3">
              <div>
                <div className="text-sm font-light">Tên đăng nhập :</div>
              </div>
              <div className="text-base font-base w-1/2 pb-2 pl-2">
                {staffInfo.username}
              </div>
            </div>
            <div className="flex flex-col text-xs font-base gap-3 gap-3">
              <div>
                <div className="text-sm font-light">Đổi mật khẩu :</div>
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
                className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
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
