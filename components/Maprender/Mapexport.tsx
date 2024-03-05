import React, { useContext, useRef, useEffect, useState } from "react";
import {
  DirectionsRenderer,
  GoogleMap,
  MarkerF,
  LoadScript,
  OverlayView,
  OverlayViewF,
} from "@react-google-maps/api";
import { motion } from "framer-motion";
import { FiZoomOut, FiZoomIn } from "react-icons/fi";
import { SourceContext } from "@/context/SourceContext";
import { DestinationContext } from "@/context/DestinationContext";
import { Button } from "@nextui-org/react";
import { FormattedMessage } from "react-intl";

import { IoMdClose } from "react-icons/io";

const MapExport = () => {
  const [isShaking, setIsShaking] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
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

  const containerstyles = {
    width: "100%",
    height: "100%",
  };
  const cordinate = {
    lat: 0,
    lng: 0,
  };
  return (
    <LoadScript googleMapsApiKey="AIzaSyDQ0pDRDKSyAO4lm10ttEXa2_uoZmWQzHc">
      <GoogleMap
        mapContainerStyle={containerstyles}
        center={cordinate}
        zoom={5}
      />
    </LoadScript>
  );
};

export default MapExport;
