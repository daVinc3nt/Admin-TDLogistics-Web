import type { NextPage } from "next";
import { LoginPage } from "@/components/LoginPage";
// import Footer from "../components/Footer/Footer";
import MobileLog from "@/components/LoginPage/MobileLog";
import { useRouter } from "next/router";
import { FormattedMessage, useIntl } from "react-intl";
const LogForm: NextPage = () => {
  return (
    <>
    <div className="hidden md:block"> 
      <LoginPage/>
    </div>
    <div className="block md:hidden">
      <MobileLog/>
    </div>
    </>
  );
};

export default LogForm;

