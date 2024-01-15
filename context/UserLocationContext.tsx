import { createContext, Dispatch, SetStateAction } from "react";

interface UserLocation {
  lat: number;
  lng: number;
}

interface UserLocationContextProps {
  userLocation: UserLocation;
  setUserLocation: Dispatch<SetStateAction<UserLocation>>;
}

export const UserLocationContext = createContext<UserLocationContextProps | undefined>(undefined);
