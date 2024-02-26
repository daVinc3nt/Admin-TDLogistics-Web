import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect} from "react";
import Wrapper from "@/components/LayoutWrapper";
import { useRouter } from "next/router";
import { IntlProvider } from "react-intl";
import * as en from "@/lang/en.json";
import * as vi from "@/lang/vi.json";
import { Libraries, LoadScript, LoadScriptProps } from "@react-google-maps/api";
import { Spinner } from "@material-tailwind/react";
import AOS from 'aos'
import 'aos/dist/aos.css'
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
      disable: 'phone',
      duration: 600,
      easing: 'ease-out-sine',
    })
  })
  return (
    <>
      <IntlProvider locale={locale} messages={messages[locale]}>
        <LoadScript
          language={locale}
          region="VN"
          libraries={googleMapsLibraries}
          googleMapsApiKey={"AIzaSyDQ0pDRDKSyAO4lm10ttEXa2_uoZmWQzHc"}
        >
          <Wrapper>
            <Component {...pageProps} />
          </Wrapper>
        </LoadScript>
      </IntlProvider>
    </>
  );
}

export default MyApp;
