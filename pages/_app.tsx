import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useState, useEffect } from "react";
import Wrapper from "@/components/LayoutWrapper";
import { useRouter } from "next/router";
import { IntlProvider } from "react-intl";
import * as en from "@/lang/en.json";
import * as vi from "@/lang/vi.json";
import { StaffsOperation } from "@/TDLib/tdlogistics";
import { Libraries, LoadScript } from "@react-google-maps/api";
import AOS from "aos";
import "aos/dist/aos.css";
import { Loading } from "@/components/Common/Loading";
import { UserContext } from "@/Context/InfoContext/UserContext";
const googleMapsLibraries: Libraries = ["places"];
const staff = new StaffsOperation ()
function MyApp({ Component, pageProps }: AppProps) {
  const { locale } = useRouter();
  const [info, setInfo] = useState(null)
  useEffect(() => {
    const fetchData = async () => {
      const res = await staff.getAuthenticatedStaffInfo();
      setInfo(res.data);
    };
    fetchData();
  }, []);
  useEffect(() => {
    console.log(info)
  }, [info]);
  const messages = {
    vi,
    en,
  };
  useEffect(() => {
    AOS.init({
      once: true,
      disable: "phone",
      duration: 600,
      easing: "ease-out-sine",
    });
  });
  return (
    <>
    <UserContext.Provider value={{info, setInfo}}>
      <IntlProvider locale={locale} messages={messages[locale]}>
        <Wrapper>
          <Component {...pageProps} />
        </Wrapper>
      </IntlProvider>
    </UserContext.Provider>
    </>
  );
}

export default MyApp;
