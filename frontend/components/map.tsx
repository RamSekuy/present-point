"use client";

import { useEffect, useRef } from "react";
import { setOptions, importLibrary } from "@googlemaps/js-api-loader";
import { GOOGLE_API, GOOGLE_MAPS_ID } from "@/config/config";
import { TCoordinate } from "@/models/coordinate.model";

type Props = {
  onCenterChange?: (coordinate: TCoordinate) => void;
  position?: TCoordinate;
};

const defaultPosition = {
  lat: -6.148392,
  lng: 106.705434,
};

export default function Map({
  onCenterChange,
  position = defaultPosition,
}: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setOptions({ key: GOOGLE_API });
    const init = async () => {
      const { Map } = await importLibrary("maps");
      const { Marker } = await importLibrary("marker");

      const mapOption = {
        mapId: GOOGLE_MAPS_ID,
        center: position,
        zoom: 17,
        mapTypeControl: false,
        streetViewControl: false,
        rotateControl: false,
      };

      const map = new Map(mapRef.current as HTMLElement, mapOption);
      const marker = new Marker({ map, position });
      if (onCenterChange) {
        map.addListener("center_changed", () => {
          const center = map.getCenter();
          if (!center) return;
          marker.setPosition(center);
          const coordinate = {
            lat: center.lat(),
            lng: center.lng(),
          };
          onCenterChange(coordinate);
        });
      }
    };
    init();
  }, []);
  return (
    <div ref={mapRef} style={{ height: 400, width: 500 }} className="mx-auto" />
  );
}
