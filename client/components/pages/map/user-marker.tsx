"use client";

import { useEffect } from "react";
import { useUserImageSrc } from "@/hooks/use-user-image-src";
import { useAuthStore } from "@/hooks/store/use-auth-store";
import {
  MAP_ICON_SIZE,
  useMapStore,
  type Bounds,
} from "@/hooks/store/use-map-store";

import { Icon, Point } from "leaflet";
import { Marker, Popup, useMap } from "react-leaflet";

export default function UserMarker() {
  const { userPosition, setUserPosition, setBounds } = useMapStore();
  const { user } = useAuthStore();

  const map = useMap();

  useEffect(() => {
    map.locate().on("locationfound", (e) => {
      setUserPosition(e.latlng);

      const b = e.target.getBounds().toBBoxString().split(",");
      const currentBounds: Bounds = {
        latMin: parseFloat(b[1]),
        latMax: parseFloat(b[3]),
        lngMin: parseFloat(b[0]),
        lngMax: parseFloat(b[2]),
      };
      setBounds(currentBounds);

      localStorage.setItem(
        "mapData",
        JSON.stringify({ userPosition: e.latlng, bounds: currentBounds }),
      );

      if (userPosition && map.getBounds().overlaps(e.bounds)) {
        return;
      }

      map.flyTo(e.latlng, map.getZoom(), { animate: false });
    });

    return () => {
      map.off();
    };
  }, [map]);

  const avatarUrl = user?.avatar?.formats.thumbnail.url;
  const src = useUserImageSrc(avatarUrl);

  const icon = new Icon({
    iconUrl: src,
    iconRetinaUrl: src,
    iconSize: new Point(MAP_ICON_SIZE, MAP_ICON_SIZE),
    iconAnchor: new Point(MAP_ICON_SIZE / 2, MAP_ICON_SIZE / 2),
    popupAnchor: new Point(0, -(MAP_ICON_SIZE / 2)),
    className: "object-cover rounded-full",
  });

  if (!userPosition) {
    return null
  }

  return (
    <Marker position={userPosition} icon={icon}>
      <Popup>You are here</Popup>
    </Marker>
  );
}
