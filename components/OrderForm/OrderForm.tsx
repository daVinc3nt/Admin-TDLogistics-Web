import classNames from "classnames";
import React, { useState, useEffect } from "react";
import { CollapsIcon } from "../Icons";
import Link from "next/link";
import LocationForm from "./LocationForm";
import MoreDetailsForm from "./MoreDetailsForm";
import OrderNotification from "./OrderNotification";
import { motion } from "framer-motion";
import { FormattedMessage } from "react-intl";

const OrderForm = ({toggleCollapse, setToggleCollapse}) => {
  const [toggleCollapse2, setToggleCollapse2] = useState(false);
  const [currentForm, setCurrentForm] = useState<number>(0);
  const [showNotification, setShowNotification] = useState(false);

  //State for LocationForm
  interface FormValues { name: string; phoneNum: string; address: string; }
  interface ErrorValues { name: string; phoneNum: string; address: string; }
  const initialValues: FormValues = { name: "", phoneNum: "", address: "" };
  const initialValues2: ErrorValues = { name: "", phoneNum: "", address: "" };
  const [formValues, setFormValues] = useState<FormValues>(initialValues);
  const [formErrors, setFormErrors] = useState<ErrorValues>(initialValues2);
  const [formValues2, setFormValues2] = useState<FormValues>(initialValues);
  const [formErrors2, setFormErrors2] = useState<ErrorValues>(initialValues2);
  const [valueSourceSearchBox, setValueSourceSearchBox] = useState(null);
  const [valueDestinationSearchBox, setValueDestinationSearchBox] = useState(null);
  const [selectedOption1, setSelectedOption1] = useState<string>('');
  const [selectedOption2, setSelectedOption2] = useState<string>('');

  //State for MoreDetailsForm
  const [selectedOption3, setSelectedOption3] = useState<string>('');
  const [selectedOption4, setSelectedOption4] = useState<string>('');

  const wrapperClasses = classNames(
    "relative bottom-0 px-4 pt-10 pb-4 ml-2 lg:ml-4  mt-2 lg:mt-4 bg-formBgColor-parent flex flex-col justify-between rounded-2xl z-20",
    {
      "h-[calc(100%-1rem)] sm:w-[calc(100%-1rem)] lg:h-[calc(100%-2rem)] md:w-4/6 lg:w-7/12 xl:w-[calc(45%)] w-[calc(100%-1rem)]": !toggleCollapse,
      "w-16 lg:w-20 h-[calc(4rem)] lg:h-[calc(5rem)]": toggleCollapse,
      "@media (min-width: 1152px)": {
        "w-7/12": !toggleCollapse,
      },
    }
  );

  const collapseIconClasses = classNames(
    "-bottom-2 lg:-bottom-6 p-2 lg:p-4 rounded bg-goBackNCollapse-default hover:bg-goBackNCollapse-hover absolute left-0",
    {
      "rotate-180": toggleCollapse,
    }
  );

  const handleOrderFormToggle = () => {
    setToggleCollapse(!toggleCollapse);
  };

  const handleSubmitButton = () => {
    (currentForm < 1) ? setCurrentForm(currentForm + 1) : setShowNotification(true);
  };

  const handleGoBackButton = () => {
    setCurrentForm(currentForm - 1);
  }

  const handleNotificationClose = () => {
    setShowNotification(false);
    setCurrentForm(0);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    timer = setTimeout(() => {
      setToggleCollapse2(toggleCollapse);
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [toggleCollapse]);

  return (
    <div className="absolute top-0 h-[calc(100%)] w-full">
      <div
        className={wrapperClasses}
        style={{ transition: "width 500ms cubic-bezier(0.2, 0, 0, 1) 0s, height 500ms cubic-bezier(0.2, 0, 0, 1) 0s" }}
      >
        <div className="flex flex-col grow h-full">
          <div className="flex items-center justify-between relative">

            <button
              className={collapseIconClasses}
              onClick={handleOrderFormToggle}
            >
              <CollapsIcon />
            </button>

          </div>
          {!toggleCollapse && !toggleCollapse2 && currentForm > 0 && (
            <div className="flex items-center justify-between relative">

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="px-2 py-1 lg:p-3 rounded bg-goBackNCollapse-default text-goBackNCollapse-text font-medium 
                        hover:bg-goBackNCollapse-hover absolute left-10 lg:left-16 -bottom-2 lg:-bottom-6"
                onClick={handleGoBackButton}
              >
                <FormattedMessage id="OrderForm.GoBack"/>
              </motion.button>

            </div>
          )}
          {!toggleCollapse && !toggleCollapse2 && currentForm == 0 && (
            <LocationForm value={valueSourceSearchBox} 
                          setValue={setValueSourceSearchBox}
                          value2={valueDestinationSearchBox}
                          setValue2={setValueDestinationSearchBox}
                          formValues={formValues}
                          setFormValues={setFormValues}
                          formErrors={formErrors}
                          setFormErrors={setFormErrors}
                          formValues2={formValues2}
                          setFormValues2={setFormValues2}
                          formErrors2={formErrors2}
                          setFormErrors2={setFormErrors2}
                          selectedOption1={selectedOption1}
                          setSelectedOption1={setSelectedOption1}
                          selectedOption2={selectedOption2}
                          setSelectedOption2={setSelectedOption2}/>
          )}
          {!toggleCollapse && !toggleCollapse2 && currentForm == 1 && (
            <MoreDetailsForm selectedOption3={selectedOption3}
                             setSelectedOption3={setSelectedOption3}
                             selectedOption4={selectedOption4}
                             setSelectedOption4={setSelectedOption4}/>
          )}
          {!toggleCollapse && !toggleCollapse2 && currentForm < 2 && (
            <div className="flex flex-col justify-start self-center w-full rounded-2xl">
              <div className="flex flex-col justify-start self-center w-full rounded-2xl">

                <h1 className="mt-4 text-xs pb-1 text-black cursor-default"><FormattedMessage id="OrderForm.Compensation"/></h1>
                <Link href="/order" className="text-xs underline  text-link-text text-nowrap">
                  <FormattedMessage id="OrderForm.Policy"/>
                </Link>

              </div>

              <button className="self-center w-full rounded-xl my-3 py-3 bg-buttonColorForm-default hover:bg-buttonColorForm-hover text-buttonColorForm-text" onClick={handleSubmitButton}>
                <FormattedMessage id="OrderForm.Continue"/>
              </button>
            </div>
          )}
        </div>

        {showNotification && (
          <OrderNotification onClose={handleNotificationClose} />
        )}

      </div>
    </div>

  );
};

export default OrderForm;