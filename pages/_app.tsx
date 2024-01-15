import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Wrapper from "@/components/LayoutWrapper";
import { useRouter } from "next/router";
import { IntlProvider } from "react-intl";
import * as en from "@/lang/en.json";
import * as vi from "@/lang/vi.json";
import { useState, useEffect } from "react";
import { Libraries, LoadScript, LoadScriptProps } from "@react-google-maps/api";
import { Spinner } from "@material-tailwind/react";


const googleMapsLibraries: Libraries = ["places"];

interface UserLocation {
  lat: number;
  lng: number;
}

interface UserLocationContextProps {
  userLocation: UserLocation;
  updateUserLocation: (newLocation: UserLocation) => void;
}

function MyApp({ Component, pageProps }: AppProps) {
  const { locale } = useRouter();
  const messages = {
    vi,
    en,
  };
  const [userLocation, setUserLocation] = useState<UserLocation>({
    lat: 10.816360162758764,
    lng: 106.62860159222816,
  });

  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setUserLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  return (
    <>
      <IntlProvider locale={locale} messages={messages[locale]}>
          <Wrapper>
            <Component {...pageProps} />
          </Wrapper>
      </IntlProvider>
    </>
  );
}

export default MyApp;
