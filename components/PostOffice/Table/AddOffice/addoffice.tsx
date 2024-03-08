import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { Button } from "@nextui-org/react";
import { FormattedMessage, useIntl } from "react-intl";
import PasswordToggle from "./PasswordToggle";
import axios from "axios";
import MapExport from "@/components/Maprender/Mapexport";
import {
  StaffsOperation,
  CreatingAgencyInfo,
  AgencyOperation,
} from "@/TDLib/tdlogistics";

interface AddOfficeProps {
  onClose: () => void;
}
interface City {
  Id: string;
  Name: string;
  Districts: District[];
}

interface District {
  Id: string;
  Name: string;
  Wards: Ward[];
}

interface Ward {
  Id: string;
  Name: string;
}

const AddOffice: React.FC<AddOfficeProps> = ({ onClose }) => {
  const [MapIsOpen, setMapIsOpen] = useState(false);

  const openMap = () => {
    setMapIsOpen(true);
  };

  const closeMap = () => {
    setMapIsOpen(false);
  };
  const [cities, setCities] = useState<City[]>([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");

  const [citiesOffice, setCitiesOffice] = useState<City[]>([]);
  const [selectedCityOffice, setSelectedCityOffice] = useState("");
  const [selectedDistrictOffice, setSelectedDistrictOffice] = useState("");

  useEffect(() => {
    const fetchCities = async () => {
      const response = await axios.get(
        "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
      );
      setCities(response.data);
    };

    fetchCities();
  }, []);

  useEffect(() => {
    const fetchCitiesOffice = async () => {
      const response = await axios.get(
        "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
      );
      setCitiesOffice(response.data);
    };

    fetchCitiesOffice();
  }, []);

  const [isShaking, setIsShaking] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [type, setType] = useState();
  const intl = useIntl();

  const openModal = (type) => {
    setType(type);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const [OfficeData, setOfficeData] = useState({
    user_fullname: "",
    username: "",
    user_password: "",
    user_date_of_birth: "",
    user_cccd: "",
    user_phone_number: "",
    user_email: "",
    user_position: "",
    user_bank: "",
    user_bin: "",
    user_salary: 0,
    paid_salary: "",
    user_province: "",
    user_district: "",
    user_town: "",
    user_detail_address: "",

    type: "",
    level: "",
    postal_code: "",
    phone_number: "",
    email: "",
    province: "",
    district: "",
    town: "",
    detail_address: "",
    bank: "",
    bin: "",
    commission_rate: "",
    latitude: "",
    longitude: "",
    managed_wards: "",
    agency_name: "",
  });

  const handleClickOutside = (event: MouseEvent) => {
    if (
      notificationRef.current &&
      !notificationRef.current.contains(event.target as Node)
    ) {
      setIsShaking(true);
      setTimeout(() => {
        setIsShaking(false);
      }, 300);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleAnimationComplete = () => {
    if (!isVisible) {
      onClose();
    }
  };

  const handleInputChange = (key: string, value: string) => {
    setOfficeData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };
  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCity(event.target.value);
    setSelectedDistrict("");
    handleInputChange(
      "user_province",
      cities.find((city) => city.Id === event.target.value).Name
    );
  };

  const handleDistrictChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedDistrict(event.target.value);
    handleInputChange(
      "user_district",
      districts.find((district) => district.Id === event.target.value).Name
    );
  };

  const handleCityChangeOffice = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCityOffice(event.target.value);
    setSelectedDistrictOffice("");
    handleInputChange(
      "province",
      citiesOffice.find((city) => city.Id === event.target.value).Name
    );
  };
  const handleDistrictChangeOffice = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedDistrictOffice(event.target.value);
    handleInputChange(
      "district",
      districtsOffice.find((district) => district.Id === event.target.value)
        .Name
    );
  };

  const selectedCityObj = cities.find((city) => city.Id === selectedCity);
  const districts = selectedCityObj ? selectedCityObj.Districts : [];

  const selectedDistrictObj = districts.find(
    (user_district) => user_district.Id === selectedDistrict
  );
  const wards = selectedDistrictObj ? selectedDistrictObj.Wards : [];

  const selectedCityObjOffice = citiesOffice.find(
    (city) => city.Id === selectedCityOffice
  );
  const districtsOffice = selectedCityObjOffice
    ? selectedCityObjOffice.Districts
    : [];
  const selectedDistrictObjOffice = districtsOffice.find(
    (user_district) => user_district.Id === selectedDistrictOffice
  );
  const wardsOffice = selectedDistrictObjOffice
    ? selectedDistrictObjOffice.Wards
    : [];

  const [Showpassword, setShowpassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowpassword((prevState) => !prevState);
  };
  const [Showpassword2, setShowpassword2] = useState(false);
  const togglePasswordVisibility2 = () => {
    setShowpassword2((prevState) => !prevState);
  };

  // A state variable to store the confirm user_password value
  const [confirmPassword, setConfirmPassword] = useState("");

  // A state variable to store the validation message
  const [validation, setValidation] = useState("");

  // A function to handle the user_password input change

  // A function to handle the confirm user_password input change
  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
    // Check if the confirm user_password matches the user_password
    if (e.target.value !== "" && e.target.value !== OfficeData.user_password) {
      setValidation("Mật khẩu không khớp!");
    } else {
      setValidation("");
    }
  };

  const [checkmissing, setCheckmissing] = useState({
    user_fullname: false,
    username: false,
    user_password: false,
    user_date_of_birth: false,
    user_cccd: false,
    user_phone_number: false,
    user_email: false,
    user_position: false,
    user_bank: false,
    user_bin: false,
    user_salary: false,
    paid_salary: false,
    user_province: false,
    user_district: false,
    user_town: false,
    user_detail_address: false,

    type: false,
    level: false,
    postal_code: false,
    phone_number: false,
    email: false,
    province: false,
    district: false,
    town: false,
    detail_address: false,
    bank: false,
    bin: false,
    commission_rate: false,
    latitude: false,
    longitude: false,
    managed_wards: false,
    agency_name: false,
  });

  const checkvalidaddress = () => {
    if (
      OfficeData.province !== "" &&
      OfficeData.district !== "" &&
      OfficeData.town !== "" &&
      OfficeData.detail_address !== ""
    ) {
      console.log(
        OfficeData.province,
        OfficeData.district,
        OfficeData.town,
        OfficeData.detail_address
      );
      return true;
    }
    return false;
  }; //dung de render map

  console.log(checkvalidaddress());

  const handleCheckMissing = (key: string, value: boolean) => {
    setCheckmissing((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };
  const [error, setError] = useState("");

  const agency = new AgencyOperation();
  const handleSubmit = async () => {
    let check = true;
    for (let key in OfficeData) {
      if (OfficeData[key] === "") {
        handleCheckMissing(key, true);
        check = false;
      } else {
        handleCheckMissing(key, false);
      }
    }
    if (!check) {
      setError("Vui lòng nhập đầy đủ thông tin");
      console.log(OfficeData);
    } else {
      setError("");
      const response = await agency.create(OfficeData);
      if (response.error) {
        setError(response.error);
      } else {
        alert("Tạo thành công");
      }
    }
  };

  return (
    <motion.div
      className={`fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-60 z-50 `}
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      onAnimationComplete={handleAnimationComplete}
      style={{ backdropFilter: "blur(12px)" }}
    >
      <motion.div
        ref={notificationRef}
        className={`relative w-[98%] sm:w-9/12 lg:w-1/2 dark:bg-[#14141a] bg-white rounded-xl p-4 overflow-y-auto ${
          isShaking ? "animate-shake" : ""
        }`}
        initial={{ scale: 0 }}
        animate={{ scale: isVisible ? 1 : 0 }}
        exit={{ scale: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative items-center justify-center flex-col flex h-10 w-full border-b-2 border-[#545e7b]">
          <div className="font-bold text-lg sm:text-2xl pb-2 dark:text-white w-full text-center">
            <FormattedMessage id="PostOffice.AddButton" />
          </div>
          <Button
            className="absolute right-0 w-8 h-8 rounded-full mb-2 hover:bg-gray-300"
            onClick={handleClose}
          >
            <IoMdClose className="w-5/6 h-5/6" />
          </Button>
        </div>
        <div className="h-screen_3/5 overflow-y-scroll border border-[#545e7b] mt-4 no-scrollbar flex flex-col items-center dark:bg-[#14141a] p-2 rounded-md dark:text-white">
          <div className="w-[98%] sm:w-10/12">
            <h1 className="font-semibold pb-2 text-center">
              <FormattedMessage id="PostOffice.Leader" />
            </h1>
            <div className="flex gap-3">
              <input
                type=""
                className={`text-xs md:text-sm border border-gray-600 rounded  dark:bg-[#14141a] h-10 p-2 w-full
                ${checkmissing.user_fullname ? "border-red-500" : ""}`}
                placeholder={intl.formatMessage({ id: "Fullname" })}
                onChange={(e) =>
                  handleInputChange("user_fullname", e.target.value)
                }
              />

              <input
                type=""
                className={`text-xs md:text-sm border border-gray-600 rounded  dark:bg-[#14141a] h-10 p-2 w-full
                ${checkmissing.user_phone_number ? "border-red-500" : ""}`}
                placeholder={intl.formatMessage({ id: "Phone" })}
                onChange={(e) =>
                  handleInputChange("user_phone_number", e.target.value)
                }
              />
            </div>
            <div className="flex gap-3 mt-3">
              <input
                type="date"
                className={`text-xs md:text-sm border border-gray-600 rounded  dark:bg-[#14141a] h-10 p-2 w-full
                ${checkmissing.user_date_of_birth ? "border-red-500" : ""}`}
                placeholder="Ngày sinh"
                onChange={(e) =>
                  handleInputChange("user_date_of_birth", e.target.value)
                }
              />
              <input
                type=""
                className={`text-xs md:text-sm border border-gray-600 rounded  dark:bg-[#14141a] h-10 p-2 w-full
                ${checkmissing.user_cccd ? "border-red-500" : ""}`}
                placeholder={intl.formatMessage({ id: "CCCD" })}
                onChange={(e) => handleInputChange("user_cccd", e.target.value)}
              />
              <input
                type=""
                className={`text-xs md:text-sm border border-gray-600 rounded  dark:bg-[#14141a] h-10 p-2 w-full
                ${checkmissing.user_email ? "border-red-500" : ""}`}
                placeholder="Email"
                onChange={(e) =>
                  handleInputChange("user_email", e.target.value)
                }
              />
            </div>
            <div className="flex gap-3 mt-3">
              <input
                type=""
                className={`text-xs md:text-sm border border-gray-600 rounded  dark:bg-[#14141a] h-10 p-2 w-full
                ${checkmissing.bank ? "border-red-500" : ""}`}
                placeholder={intl.formatMessage({ id: "BankName" })}
                onChange={(e) =>
                  handleInputChange("user_province", e.target.value)
                }
              />
              <input
                type=""
                className={`text-xs md:text-sm border border-gray-600 rounded  dark:bg-[#14141a] h-10 p-2 w-full
                ${checkmissing.bin ? "border-red-500" : ""}`}
                placeholder={intl.formatMessage({ id: "BankNumber" })}
                onChange={(e) =>
                  handleInputChange("user_province", e.target.value)
                }
              />
            </div>
            <div className="flex gap-3 mt-3">
              <select
                className={`text-xs md:text-sm border border-gray-600 rounded  dark:bg-[#14141a] h-10 p-2 w-full
                ${checkmissing.user_province ? "border-red-500" : ""}`}
                id="city"
                aria-label=".form-select-sm"
                value={selectedCity}
                onChange={handleCityChange}
              >
                <option value="">
                  {intl.formatMessage({ id: "Choose Province" })}
                </option>
                {cities.map((city) => (
                  <option key={city.Id} value={city.Id}>
                    {city.Name}
                  </option>
                ))}
              </select>
              <select
                className={`text-xs md:text-sm border border-gray-600 rounded  dark:bg-[#14141a] h-10 p-2 w-full
                ${checkmissing.user_district ? "border-red-500" : ""}
                `}
                id="user_district"
                aria-label=".form-select-sm"
                value={selectedDistrict}
                onChange={handleDistrictChange}
              >
                <option value="">
                  {intl.formatMessage({ id: "Choose District" })}
                </option>
                {districts.map((user_district) => (
                  <option key={user_district.Id} value={user_district.Id}>
                    {user_district.Name}
                  </option>
                ))}
              </select>
              <select
                className={`text-xs md:text-sm border border-gray-600 rounded  dark:bg-[#14141a] h-10 p-2 w-full
                ${checkmissing.user_town ? "border-red-500" : ""}`}
                id="ward"
                aria-label=".form-select-sm"
                onChange={(e) =>
                  handleInputChange(
                    "user_town",
                    wards.find((ward) => ward.Id === e.target.value).Name
                  )
                }
              >
                <option value="">
                  {intl.formatMessage({ id: "Choose Ward" })}
                </option>
                {wards.map((ward) => (
                  <option key={ward.Id} value={ward.Id}>
                    {ward.Name}
                  </option>
                ))}
              </select>

              <input
                type=""
                className={`text-xs md:text-sm border border-gray-600 rounded  dark:bg-[#14141a] h-10 p-2 w-full
                ${checkmissing.user_detail_address ? "border-red-500" : ""}`}
                placeholder="Số nhà- tên đường"
                onChange={(e) =>
                  handleInputChange("user_detail_address", e.target.value)
                }
              />
            </div>
          </div>

          <div className="w-[98%] sm:w-10/12 mt-5">
            <h1 className="font-semibold pb-2 text-center">
              <FormattedMessage id="Create Account" />
            </h1>
            <div className="flex-row gap-">
              <div>
                <input
                  type=""
                  className={`ext-xs md:text-sm border w-full border-gray-600 rounded  dark:bg-[#14141a] h-10 p-2
                  ${checkmissing.username ? "border-red-500" : ""}`}
                  placeholder={intl.formatMessage({ id: "Username" })}
                  onChange={(e) =>
                    handleInputChange("username", e.target.value)
                  }
                />
                <p className="flex items-center gap-1 mt-2 font-sans text-sm antialiased font-normal leading-normal text-gray-700">
                  <FormattedMessage id="RegexUsername" />
                </p>
              </div>

              <div className="">
                <div className="relative">
                  <input
                    type={Showpassword ? "text" : "user_password"}
                    placeholder={intl.formatMessage({ id: "Password" })}
                    id="user_password"
                    value={OfficeData.user_password}
                    onChange={(e) =>
                      handleInputChange("user_password", e.target.value)
                    }
                    className={`text-xs mt-3 md:text-sm border border-gray-600 rounded  dark:bg-[#14141a] h-10 w-full p-2 focus:ring-blue-500 focus:border-blue-500 focus:ring-
                    ${checkmissing.user_password ? "border-red-500" : ""} `}
                  />

                  <button onClick={togglePasswordVisibility}>
                    <PasswordToggle />
                  </button>
                </div>
                <p className="flex items-center gap-1 mt-2 font-sans text-sm antialiased font-normal leading-normal text-gray-700">
                  <FormattedMessage id="RegexPassword" />
                </p>
              </div>

              <div>
                <div className="relative">
                  <input
                    type={Showpassword2 ? "text" : "user_password"}
                    placeholder={intl.formatMessage({ id: "ConfirmPassword" })}
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    className=" text-xs mt-3 w-full md:text-sm border border-gray-600 rounded  dark:bg-[#14141a] h-10 p-2 focus:ring-blue-500 focus:border-blue-500 focus:ring-1"
                  />

                  <button onClick={togglePasswordVisibility2}>
                    <PasswordToggle />
                  </button>
                  <p
                    id="validation"
                    className="text-center text-orange-500 italic text-sm"
                  >
                    {validation}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-3">
              <input
                type=""
                className={`text-xs md:text-sm border border-gray-600 rounded  dark:bg-[#14141a] h-10 p-2 w-full
                ${checkmissing.user_position ? "border-red-500" : ""}`}
                placeholder={intl.formatMessage({ id: "Role" })}
                onChange={(e) => handleInputChange("position", e.target.value)}
              />
              <input
                type="string"
                className={`text-xs md:text-sm border border-gray-600 rounded  dark:bg-[#14141a] h-10 p-2 w-full
                ${checkmissing.user_salary ? "border-red-500" : ""}`}
                placeholder={intl.formatMessage({ id: "Salary" })}
                onChange={(e) =>
                  handleInputChange("user_salary", e.target.value)
                }
              />
            </div>
          </div>
          <div className="w-[98%] sm:w-10/12 mt-5">
            <h1 className="font-semibold pb-2 text-center">
              <FormattedMessage id="PostOffice.Infomation" />
            </h1>
            <div className="flex gap-3">
              <input
                type=""
                className={`text-xs md:text-sm border border-gray-600 rounded  dark:bg-[#14141a] h-10 p-2 w-full
                ${checkmissing.type ? "border-red-500" : ""}`}
                placeholder={intl.formatMessage({ id: "PostOffice.Info.Type" })}
                onChange={(e) =>
                  handleInputChange("user_fullname", e.target.value)
                }
              />
              <input
                type=""
                className={`text-xs md:text-sm border border-gray-600 rounded  dark:bg-[#14141a] h-10 p-2 w-full
                ${checkmissing.level ? "border-red-500" : ""}`}
                placeholder={intl.formatMessage({
                  id: "PostOffice.Info.Level",
                })}
                onChange={(e) => handleInputChange("age", e.target.value)}
              />
              <input
                type=""
                className={`text-xs md:text-sm border border-gray-600 rounded  dark:bg-[#14141a] h-10 p-2 w-full
                ${checkmissing.postal_code ? "border-red-500" : ""}`}
                placeholder={intl.formatMessage({
                  id: "PostOffice.Info.PostalCode",
                })}
                onChange={(e) =>
                  handleInputChange("user_phone_number", e.target.value)
                }
              />
            </div>
            <div className="flex gap-3 mt-3">
              <input
                type="number"
                className={`text-xs md:text-sm border border-gray-600 rounded  dark:bg-[#14141a] h-10 p-2 w-full
                ${checkmissing.phone_number ? "border-red-500" : ""}`}
                placeholder={intl.formatMessage({ id: "Phone" })}
                onChange={(e) =>
                  handleInputChange("user_date_of_birth", e.target.value)
                }
              />
              <input
                type=""
                className={`text-xs md:text-sm border border-gray-600 rounded  dark:bg-[#14141a] h-10 p-2 w-full
                ${checkmissing.commission_rate ? "border-red-500" : ""}`}
                placeholder={intl.formatMessage({ id: "PostOffice.Rate" })}
                onChange={(e) => handleInputChange("user_cccd", e.target.value)}
              />
              <input
                type=""
                className={`text-xs md:text-sm border border-gray-600 rounded  dark:bg-[#14141a] h-10 p-2 w-full
                ${checkmissing.email ? "border-red-500" : ""}`}
                placeholder="Email"
                onChange={(e) =>
                  handleInputChange("user_email", e.target.value)
                }
              />
            </div>
            <div className="flex gap-3 mt-3">
              <select
                className={`text-xs md:text-sm border border-gray-600 rounded  dark:bg-[#14141a] h-10 p-2 w-full
                ${checkmissing.province ? "border-red-500" : ""}`}
                id="city"
                aria-label=".form-select-sm"
                value={selectedCityOffice}
                onChange={handleCityChangeOffice}
              >
                <option value="">
                  {intl.formatMessage({ id: "Choose Province" })}
                </option>
                {citiesOffice.map((city) => (
                  <option key={city.Id} value={city.Id}>
                    {city.Name}
                  </option>
                ))}
              </select>
              <select
                className={`text-xs md:text-sm border border-gray-600 rounded  dark:bg-[#14141a] h-10 p-2 w-full
                ${checkmissing.district ? "border-red-500" : ""}
                `}
                id="user_district"
                aria-label=".form-select-sm"
                value={selectedDistrictOffice}
                onChange={handleDistrictChangeOffice}
              >
                <option value="">
                  {intl.formatMessage({ id: "Choose District" })}
                </option>
                {districtsOffice.map((user_district) => (
                  <option key={user_district.Id} value={user_district.Id}>
                    {user_district.Name}
                  </option>
                ))}
              </select>
              <select
                className={`text-xs md:text-sm border border-gray-600 rounded  dark:bg-[#14141a] h-10 p-2 w-full
                ${checkmissing.town ? "border-red-500" : ""}`}
                id="ward"
                aria-label=".form-select-sm"
                onChange={(e) =>
                  handleInputChange(
                    "town",
                    wardsOffice.find((ward) => ward.Id === e.target.value).Name
                  )
                }
              >
                <option value="">
                  {intl.formatMessage({ id: "Choose Ward" })}
                </option>
                {wardsOffice.map((ward) => (
                  <option key={ward.Id} value={ward.Id}>
                    {ward.Name}
                  </option>
                ))}
              </select>

              <input
                type=""
                className={`text-xs md:text-sm border border-gray-600 rounded  dark:bg-[#14141a] h-10 p-2 w-full
                ${checkmissing.detail_address ? "border-red-500" : ""}`}
                placeholder={intl.formatMessage({ id: "Address" })}
                onChange={(e) =>
                  handleInputChange("detail_address", e.target.value)
                }
              />
              <Button
                className="text-xs md:text-sm border border-gray-600 rounded  dark:bg-[#14141a] h-10 p-2 w-full"
                onClick={openMap}
              >
                Mở bản đồ
              </Button>
              {MapIsOpen && <MapExport />}
            </div>
            <div className="flex gap-3 mt-3">
              <input
                type=""
                className={`text-xs md:text-sm border border-gray-600 rounded  dark:bg-[#14141a] h-10 p-2 w-full
                ${checkmissing.bank ? "border-red-500" : ""}`}
                placeholder={intl.formatMessage({ id: "BankName" })}
                onChange={(e) => handleInputChange("bank", e.target.value)}
              />
              <input
                type=""
                className={`text-xs md:text-sm border border-gray-600 rounded  dark:bg-[#14141a] h-10 p-2 w-full
                ${checkmissing.bin ? "border-red-500" : ""}`}
                placeholder={intl.formatMessage({ id: "BankNumber" })}
                onChange={(e) => handleInputChange("bin", e.target.value)}
              />
            </div>
          </div>
        </div>
        <Button
          className="w-full rounded-lg mt-5 mb-1 py-3 border-green-700 hover:bg-green-700 text-green-500
        bg-transparent drop-shadow-md hover:drop-shadow-xl hover:text-white border hover:shadow-md"
          onClick={handleSubmit}
        >
          <span className="hidden xs:block">
            <FormattedMessage id="PostOffice.AddButton" />
          </span>
        </Button>
        <div className=" flex place-content-center text-red-500 font-bold ">
          {error && <p>{error}</p>}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AddOffice;
