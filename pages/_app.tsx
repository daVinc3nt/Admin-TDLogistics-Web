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
import { AppContext } from "@/Context/InfoContext/UserContext";
const googleMapsLibraries: Libraries = ["places"];

function MyApp({ Component, pageProps }: AppProps) {

  const { locale } = useRouter();
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
    <AppContext.Provider value="" >
      <IntlProvider locale={locale} messages={messages[locale]}>
        <Wrapper>
          {/* <Loading /> */}
          <Component {...pageProps} />
        </Wrapper>
      </IntlProvider>
    </AppContext.Provider>
    </>
  );
}

export default MyApp;
