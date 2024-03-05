import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { Button } from "@nextui-org/react";
import { FormattedMessage, useIntl } from "react-intl";
import PasswordToggle from "./PasswordToggle";
import axios from "axios";
import MapExport from "@/components/Maprender/Mapexport";
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
    fullname: "",
    username: "",
    password: "",
    dateofbirth: "",
    cccd: "",
    age: "",
    phone: "",
    email: "",
    role: "",
    nameBank: "",
    accountBank: "",
    position: "",
    salary: "",
    paid_salary: "",
    province: "",
    district: "",
    town: "",
    detail_address: "",

    typeOffice: "",
    levelOffice: "",
    postalCode: "",
    phoneOffice: "",
    emailOffice: "",
    provinceOffice: "",
    districtOffice: "",
    townOffice: "",
    detail_addressOffice: "",
    nameBankOffice: "",
    accountBankOffice: "",
    rateCommission: "",
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
    handleInputChange("province", event.target.value);
  };

  const handleDistrictChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedDistrict(event.target.value);
    handleInputChange("district", event.target.value);
  };

  const handleCityChangeOffice = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCityOffice(event.target.value);
    setSelectedDistrictOffice("");
    handleInputChange("provinceOffice", event.target.value);
  };
  const handleDistrictChangeOffice = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedDistrictOffice(event.target.value);
    handleInputChange("districtOffice", event.target.value);
  };

  const selectedCityObj = cities.find((city) => city.Id === selectedCity);
  const districts = selectedCityObj ? selectedCityObj.Districts : [];

  const selectedDistrictObj = districts.find(
    (district) => district.Id === selectedDistrict
  );
  const wards = selectedDistrictObj ? selectedDistrictObj.Wards : [];

  const selectedCityObjOffice = citiesOffice.find(
    (city) => city.Id === selectedCityOffice
  );
  const districtsOffice = selectedCityObjOffice
    ? selectedCityObjOffice.Districts
    : [];
  const selectedDistrictObjOffice = districtsOffice.find(
    (district) => district.Id === selectedDistrictOffice
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

  // A state variable to store the confirm password value
  const [confirmPassword, setConfirmPassword] = useState("");

  // A state variable to store the validation message
  const [validation, setValidation] = useState("");

  // A function to handle the password input change

  // A function to handle the confirm password input change
  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
    // Check if the confirm password matches the password
    if (e.target.value !== "" && e.target.value !== OfficeData.password) {
      setValidation("Mật khẩu không khớp!");
    } else {
      setValidation("");
    }
  };

  const [checkmissing, setCheckmissing] = useState({
    fullname: false,
    username: false,
    password: false,
    dateofbirth: false,
    cccd: false,
    age: false,
    phone: false,
    email: false,
    role: false,
    nameBank: false,
    accountBank: false,
    position: false,
    salary: false,
    paid_salary: false,
    province: false,
    district: false,
    town: false,
    detail_address: false,

    typeOffice: false,
    levelOffice: false,
    postalCode: false,
    phoneOffice: false,
    emailOffice: false,
    provinceOffice: false,
    districtOffice: false,
    townOffice: false,
    detail_addressOffice: false,
    nameBankOffice: false,
    accountBankOffice: false,
    rateCommission: false,
  });

  const checkvalidaddress = () => {
    if (
      OfficeData.provinceOffice !== "" &&
      OfficeData.districtOffice !== "" &&
      OfficeData.townOffice !== "" &&
      OfficeData.detail_addressOffice !== ""
    ) {
      console.log(
        OfficeData.provinceOffice,
        OfficeData.districtOffice,
        OfficeData.townOffice,
        OfficeData.detail_addressOffice
      );
      return true;
    }
    return false;
  };
  console.log(checkvalidaddress());
  const handleCheckMissing = (key: string, value: boolean) => {
    setCheckmissing((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };
  const [error, setError] = useState("");

  const handleSubmit = () => {
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
    } else {
      setError("");
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
        className={`relative w-[98%] sm:w-9/12 lg:w-1/2 bg-[#14141a] rounded-xl p-4 overflow-y-auto ${
          isShaking ? "animate-shake" : ""
        }`}
        initial={{ scale: 0 }}
        animate={{ scale: isVisible ? 1 : 0 }}
        exit={{ scale: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative items-center justify-center flex-col flex h-10 w-full border-b-2 border-[#545e7b]">
          <div className="font-bold text-lg sm:text-2xl pb-2 text-white w-full text-center">
            <FormattedMessage id="PostOffice.AddButton" />
          </div>
          <Button
            className="absolute right-0 w-8 h-8 rounded-full mb-2 hover:bg-gray-300"
            onClick={handleClose}
          >
            <IoMdClose className="w-5/6 h-5/6" />
          </Button>
        </div>
        <div className="h-screen_3/5 overflow-y-scroll border border-[#545e7b] mt-4 no-scrollbar flex flex-col items-center bg-[#14141a] p-2 rounded-md text-white">
          <div className="w-[98%] sm:w-10/12">
            <h1 className="font-semibold pb-2 text-center">
              <FormattedMessage id="PostOffice.Leader" />
            </h1>
            <div className="flex gap-3">
              <input
                type=""
                className={`text-xs md:text-sm border border-gray-600 rounded  bg-[#14141a] h-10 p-2 w-full
                ${checkmissing.fullname ? "border-red-500" : ""}`}
                placeholder={intl.formatMessage({ id: "Fullname" })}
                onChange={(e) => handleInputChange("fullname", e.target.value)}
              />

              <input
                type=""
                className={`text-xs md:text-sm border border-gray-600 rounded  bg-[#14141a] h-10 p-2 w-full
                ${checkmissing.phone ? "border-red-500" : ""}`}
                placeholder={intl.formatMessage({ id: "Phone" })}
                onChange={(e) => handleInputChange("phone", e.target.value)}
              />
            </div>
            <div className="flex gap-3 mt-3">
              <input
                type="date"
                className={`text-xs md:text-sm border border-gray-600 rounded  bg-[#14141a] h-10 p-2 w-full
                ${checkmissing.dateofbirth ? "border-red-500" : ""}`}
                placeholder="Ngày sinh"
                onChange={(e) =>
                  handleInputChange("dateofbirth", e.target.value)
                }
              />
              <input
                type=""
                className={`text-xs md:text-sm border border-gray-600 rounded  bg-[#14141a] h-10 p-2 w-full
                ${checkmissing.cccd ? "border-red-500" : ""}`}
                placeholder={intl.formatMessage({ id: "CCCD" })}
                onChange={(e) => handleInputChange("cccd", e.target.value)}
              />
              <input
                type=""
                className={`text-xs md:text-sm border border-gray-600 rounded  bg-[#14141a] h-10 p-2 w-full
                ${checkmissing.email ? "border-red-500" : ""}`}
                placeholder="Email"
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
            </div>
            <div className="flex gap-3 mt-3">
              <input
                type=""
                className={`text-xs md:text-sm border border-gray-600 rounded  bg-[#14141a] h-10 p-2 w-full
                ${checkmissing.nameBankOffice ? "border-red-500" : ""}`}
                placeholder={intl.formatMessage({ id: "BankName" })}
                onChange={(e) => handleInputChange("province", e.target.value)}
              />
              <input
                type=""
                className={`text-xs md:text-sm border border-gray-600 rounded  bg-[#14141a] h-10 p-2 w-full
                ${checkmissing.accountBankOffice ? "border-red-500" : ""}`}
                placeholder={intl.formatMessage({ id: "BankNumber" })}
                onChange={(e) => handleInputChange("province", e.target.value)}
              />
            </div>
            <div className="flex gap-3 mt-3">
              <select
                className={`text-xs md:text-sm border border-gray-600 rounded  bg-[#14141a] h-10 p-2 w-full
                ${checkmissing.province ? "border-red-500" : ""}`}
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
                className={`text-xs md:text-sm border border-gray-600 rounded  bg-[#14141a] h-10 p-2 w-full
                ${checkmissing.district ? "border-red-500" : ""}
                `}
                id="district"
                aria-label=".form-select-sm"
                value={selectedDistrict}
                onChange={handleDistrictChange}
              >
                <option value="">
                  {intl.formatMessage({ id: "Choose District" })}
                </option>
                {districts.map((district) => (
                  <option key={district.Id} value={district.Id}>
                    {district.Name}
                  </option>
                ))}
              </select>
              <select
                className={`text-xs md:text-sm border border-gray-600 rounded  bg-[#14141a] h-10 p-2 w-full
                ${checkmissing.town ? "border-red-500" : ""}`}
                id="ward"
                aria-label=".form-select-sm"
                onChange={(e) => handleInputChange("town", e.target.value)}
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
                className={`text-xs md:text-sm border border-gray-600 rounded  bg-[#14141a] h-10 p-2 w-full
                ${checkmissing.detail_address ? "border-red-500" : ""}`}
                placeholder="Số nhà- tên đường"
                onChange={(e) =>
                  handleInputChange("detail_address", e.target.value)
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
                  className={`ext-xs md:text-sm border w-full border-gray-600 rounded  bg-[#14141a] h-10 p-2
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
                    type={Showpassword ? "text" : "password"}
                    placeholder={intl.formatMessage({ id: "Password" })}
                    id="password"
                    value={OfficeData.password}
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                    className={`text-xs mt-3 md:text-sm border border-gray-600 rounded  bg-[#14141a] h-10 w-full p-2 focus:ring-blue-500 focus:border-blue-500 focus:ring-
                    ${checkmissing.password ? "border-red-500" : ""} `}
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
                    type={Showpassword2 ? "text" : "password"}
                    placeholder={intl.formatMessage({ id: "ConfirmPassword" })}
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    className=" text-xs mt-3 w-full md:text-sm border border-gray-600 rounded  bg-[#14141a] h-10 p-2 focus:ring-blue-500 focus:border-blue-500 focus:ring-1"
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
                className={`text-xs md:text-sm border border-gray-600 rounded  bg-[#14141a] h-10 p-2 w-full
                ${checkmissing.role ? "border-red-500" : ""}`}
                placeholder={intl.formatMessage({ id: "Role" })}
                onChange={(e) => handleInputChange("position", e.target.value)}
              />
              <input
                type="number"
                className={`text-xs md:text-sm border border-gray-600 rounded  bg-[#14141a] h-10 p-2 w-full
                ${checkmissing.salary ? "border-red-500" : ""}`}
                placeholder={intl.formatMessage({ id: "Salary" })}
                onChange={(e) => handleInputChange("salary", e.target.value)}
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
                className={`text-xs md:text-sm border border-gray-600 rounded  bg-[#14141a] h-10 p-2 w-full
                ${checkmissing.typeOffice ? "border-red-500" : ""}`}
                placeholder={intl.formatMessage({ id: "PostOffice.Info.Type" })}
                onChange={(e) => handleInputChange("fullname", e.target.value)}
              />
              <input
                type=""
                className={`text-xs md:text-sm border border-gray-600 rounded  bg-[#14141a] h-10 p-2 w-full
                ${checkmissing.levelOffice ? "border-red-500" : ""}`}
                placeholder={intl.formatMessage({
                  id: "PostOffice.Info.Level",
                })}
                onChange={(e) => handleInputChange("age", e.target.value)}
              />
              <input
                type=""
                className={`text-xs md:text-sm border border-gray-600 rounded  bg-[#14141a] h-10 p-2 w-full
                ${checkmissing.postalCode ? "border-red-500" : ""}`}
                placeholder={intl.formatMessage({
                  id: "PostOffice.Info.PostalCode",
                })}
                onChange={(e) => handleInputChange("phone", e.target.value)}
              />
            </div>
            <div className="flex gap-3 mt-3">
              <input
                type="number"
                className={`text-xs md:text-sm border border-gray-600 rounded  bg-[#14141a] h-10 p-2 w-full
                ${checkmissing.phoneOffice ? "border-red-500" : ""}`}
                placeholder={intl.formatMessage({ id: "Phone" })}
                onChange={(e) =>
                  handleInputChange("dateofbirth", e.target.value)
                }
              />
              <input
                type=""
                className={`text-xs md:text-sm border border-gray-600 rounded  bg-[#14141a] h-10 p-2 w-full
                ${checkmissing.rateCommission ? "border-red-500" : ""}`}
                placeholder={intl.formatMessage({ id: "PostOffice.Rate" })}
                onChange={(e) => handleInputChange("cccd", e.target.value)}
              />
              <input
                type=""
                className={`text-xs md:text-sm border border-gray-600 rounded  bg-[#14141a] h-10 p-2 w-full
                ${checkmissing.emailOffice ? "border-red-500" : ""}`}
                placeholder="Email"
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
            </div>
            <div className="flex gap-3 mt-3">
              <select
                className={`text-xs md:text-sm border border-gray-600 rounded  bg-[#14141a] h-10 p-2 w-full
                ${checkmissing.provinceOffice ? "border-red-500" : ""}`}
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
                className={`text-xs md:text-sm border border-gray-600 rounded  bg-[#14141a] h-10 p-2 w-full
                ${checkmissing.districtOffice ? "border-red-500" : ""}
                `}
                id="district"
                aria-label=".form-select-sm"
                value={selectedDistrictOffice}
                onChange={handleDistrictChangeOffice}
              >
                <option value="">
                  {intl.formatMessage({ id: "Choose District" })}
                </option>
                {districtsOffice.map((district) => (
                  <option key={district.Id} value={district.Id}>
                    {district.Name}
                  </option>
                ))}
              </select>
              <select
                className={`text-xs md:text-sm border border-gray-600 rounded  bg-[#14141a] h-10 p-2 w-full
                ${checkmissing.townOffice ? "border-red-500" : ""}`}
                id="ward"
                aria-label=".form-select-sm"
                onChange={(e) =>
                  handleInputChange("townOffice", e.target.value)
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
                className={`text-xs md:text-sm border border-gray-600 rounded  bg-[#14141a] h-10 p-2 w-full
                ${checkmissing.detail_addressOffice ? "border-red-500" : ""}`}
                placeholder={intl.formatMessage({ id: "Address" })}
                onChange={(e) =>
                  handleInputChange("detail_addressOffice", e.target.value)
                }
              />
              <Button
                className="text-xs md:text-sm border border-gray-600 rounded  bg-[#14141a] h-10 p-2 w-full"
                onClick={openMap}
              >
                Mở bản đồ
              </Button>
              {MapIsOpen && <MapExport />}
            </div>
            <div className="flex gap-3 mt-3">
              <input
                type=""
                className={`text-xs md:text-sm border border-gray-600 rounded  bg-[#14141a] h-10 p-2 w-full
                ${checkmissing.nameBankOffice ? "border-red-500" : ""}`}
                placeholder={intl.formatMessage({ id: "BankName" })}
                onChange={(e) =>
                  handleInputChange("nameBankOffice", e.target.value)
                }
              />
              <input
                type=""
                className={`text-xs md:text-sm border border-gray-600 rounded  bg-[#14141a] h-10 p-2 w-full
                ${checkmissing.accountBankOffice ? "border-red-500" : ""}`}
                placeholder={intl.formatMessage({ id: "BankNumber" })}
                onChange={(e) =>
                  handleInputChange("accountBankOffice", e.target.value)
                }
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
