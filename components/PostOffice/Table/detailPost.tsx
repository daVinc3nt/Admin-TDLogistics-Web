import React, { useRef, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { Button } from "@nextui-org/react";
import { FaTrash, FaPen } from "react-icons/fa";
import { FormattedMessage } from "react-intl";
import {
  StaffsOperation,
  AgencyOperation,
  UpdatingAgencyCondition,
  UpdatingAgencyInfo,
} from "@/TDLib/tdlogistics";
import axios from "axios";
interface Postdetail {
  agency_id: string;
  agency_name: string;
  bank: string;
  bin: string;
  commission_rate: number;
  contract: string;
  detail_address: string;
  district: string;
  email: string;
  latitude: number;
  level: string;
  longitude: number;
  managed_wards: string[];
  phone_number: string;
  postal_code: string;
  province: string;
  town: string;
  revenue: number;
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
const staff = new StaffsOperation();

interface DetailStaffProps {
  onClose: () => void;
  dataInitial: Postdetail;
}

const DetailPost: React.FC<DetailStaffProps> = ({ onClose, dataInitial }) => {
  const [isShaking, setIsShaking] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [data, setData] = useState(dataInitial);
  const [cities, setCities] = useState<City[]>([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [role, setRole] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await staff.getAuthenticatedStaffInfo();
      setRole(res.data.role);
    };

    fetchData();
  }, []);
  useEffect(() => {
    const fetchCities = async () => {
      const response = await axios.get(
        "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
      );
      setCities(response.data);
    };

    fetchCities();
  }, []);
  const [Agencydata, setAgencydata] = useState({
    agency_name: "",
    province: "",
    district: "",
    town: "",
    detail_address: "",
    latitude: "",
    longitude: "",
    email: "",
    phone_number: "",
    revenue: "",
    commission_rate: "",
    bin: "",
    bank: "",
  });

  const handleInputChange = (key: string, value: string) => {
    setAgencydata((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };
  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCity(event.target.value);
    setSelectedDistrict("");
    handleInputChange(
      "province",
      cities.find((city) => city.Id === event.target.value).Name
    );
  };

  const handleDistrictChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedDistrict(event.target.value);
    handleInputChange(
      "district",
      districts.find((district) => district.Id === event.target.value).Name
    );
  };

  const selectedCityObj = cities.find((city) => city.Id === selectedCity);
  const districts = selectedCityObj ? selectedCityObj.Districts : [];

  const selectedDistrictObj = districts.find(
    (district) => district.Id === selectedDistrict
  );
  const wards = selectedDistrictObj ? selectedDistrictObj.Wards : [];

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
  const [isEditing, setIsEditing] = useState(false);
  const handleEditClick = () => {
    setIsEditing(true);
  };
  const handleSaveClick = () => {
    const updateAgency = new AgencyOperation();

    const data: UpdatingAgencyInfo = {
      agency_name: Agencydata.agency_name,
      province: Agencydata.province,
      district: Agencydata.district,
      town: Agencydata.town,
      detail_address: Agencydata.detail_address,
      latitude: Agencydata.latitude,
      longitude: Agencydata.longitude,
      email: Agencydata.email,
      phone_number: Agencydata.phone_number,
      revenue: Agencydata.revenue,
      commission_rate: Agencydata.commission_rate,
      bin: Agencydata.bin,
      bank: Agencydata.bank,
    };
    if (
      role === "ADMIN" ||
      role === "MANAGER" ||
      role === "HUMAN_RESOURCE_MANAGER"
    ) {
      const condition: UpdatingAgencyCondition = {
        agency_id: dataInitial.agency_id,
      };
      const response = updateAgency.update(data, condition);
      if (response) {
        console.log(response);
      }
    }

    setIsEditing(false);
  };

  return (
    <motion.div
      className={`fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-60 z-50 text-[#545e7b]`}
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      onAnimationComplete={handleAnimationComplete}
      style={{
        backdropFilter: "blur(12px)",
      }}
    >
      <motion.div
        ref={notificationRef}
        className={`relative w-[98%] sm:w-9/12 dark:bg-[#14141a] bg-white rounded-xl p-4 overflow-y-auto
          ${isShaking ? "animate-shake" : ""}`}
        initial={{ scale: 0 }}
        animate={{ scale: isVisible ? 1 : 0 }}
        exit={{ scale: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative items-center justify-center flex-col flex h-10 w-full border-b-2 border-[#545e7b]">
          <div className="font-bold text-lg sm:text-2xl pb-2 dark:text-white w-full text-center">
            <FormattedMessage id="PostOffice.Infomation" />
          </div>
          <Button
            className="absolute right-0 w-8 h-8 rounded-full mb-2 hover:bg-gray-300"
            onClick={handleClose}
          >
            <IoMdClose className="w-5/6 h-5/6 " />
          </Button>
        </div>
        <div className="h-screen_3/5 overflow-y-scroll border border-[#545e7b] mt-4 no-scrollbar  dark:bg-[#14141a] p-2 rounded-md dark:text-white place-content-center">
          <div className="grid grid-cols-2">
            <div className="flex gap-5">
              <div className="font-bold text-base">
                <FormattedMessage id="PostOffice.Name" />:
              </div>
              {isEditing ? (
                <input
                  className="w-1/2 bg-transparent border-b-2 border-[#545e7b] dark:text-white"
                  type="text"
                  value={data.agency_name}
                  onChange={(e) =>
                    setData({ ...data, agency_name: e.target.value })
                  }
                />
              ) : (
                <div>{data.agency_name}</div>
              )}
            </div>
            <div className="flex gap-5">
              <div className="font-bold text-base">
                <FormattedMessage id="PostOffice.Phone" />:
              </div>
              {isEditing ? (
                <input
                  className="w-1/2 bg-transparent border-b-2 border-[#545e7b] dark:text-white"
                  type="text"
                  value={data.phone_number}
                  onChange={(e) =>
                    setData({ ...data, phone_number: e.target.value })
                  }
                />
              ) : (
                <div>{data.phone_number}</div>
              )}
            </div>
            <div className="flex gap-5">
              <div className="font-bold text-base">Email:</div>
              {isEditing ? (
                <input
                  className="w-1/2 bg-transparent border-b-2 border-[#545e7b] dark:text-white"
                  type="text"
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                />
              ) : (
                <div>{data.email}</div>
              )}
            </div>
            <div className="flex gap-5">
              <div className="font-bold text-base">
                <FormattedMessage id="PostOffice.Address" />:
              </div>
              {isEditing ? (
                <input
                  className="w-1/2 bg-transparent border-b-2 border-[#545e7b] dark:text-white"
                  type="text"
                  value={data.detail_address}
                  onChange={(e) =>
                    setData({ ...data, detail_address: e.target.value })
                  }
                />
              ) : (
                <div>{data.detail_address}</div>
              )}
            </div>

            <div className="flex gap-5">
              <div className="font-bold text-base">
                <FormattedMessage id="PostOffice.BankName" />:
              </div>
              {isEditing ? (
                <input
                  className="w-1/2 bg-transparent border-b-2 border-[#545e7b] dark:text-white"
                  type="text"
                  value={data.bank}
                  onChange={(e) => setData({ ...data, bank: e.target.value })}
                />
              ) : (
                <div>{data.bank}</div>
              )}
            </div>
            <div className="flex gap-5">
              <div className="font-bold text-base">
                <FormattedMessage id="PostOffice.BankNumber" />:
              </div>
              {isEditing ? (
                <input
                  className="w-1/2 bg-transparent border-b-2 border-[#545e7b] dark:text-white"
                  type="text"
                  value={data.bin}
                  onChange={(e) => setData({ ...data, bin: e.target.value })}
                />
              ) : (
                <div>{data.bin}</div>
              )}
            </div>
          </div>
        </div>

        <div className="w-full flex">
          {!isEditing ? (
            <Button
              className="w-full rounded-lg mt-5 mb-1 py-3 border-green-700 hover:bg-green-700 text-green-500
              bg-transparent drop-shadow-md hover:drop-shadow-xl hover:text-white border 
              hover:shadow-md"
              onClick={handleEditClick}
            >
              <FaPen className="xs:mr-2" />
              <span className="hidden xs:block">
                <FormattedMessage id="Edit" />
              </span>
            </Button>
          ) : (
            <Button
              className="w-full rounded-lg mt-5 mb-1 py-3 border-green-700 hover:bg-green-700 text-green-500
    bg-transparent drop-shadow-md hover:drop-shadow-xl hover:text-white border 
    hover:shadow-md"
              onClick={handleSaveClick}
            >
              <FaPen className="xs:mr-2" />
              <span className="hidden xs:block">
                <FormattedMessage id="Save" />
              </span>
            </Button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DetailPost;
