"use client";

import { useEffect } from "react";
import Image from "next/image";
import ReactDOMServer from "react-dom/server";
import { useAuthStore } from "@/hooks/store/use-auth-store";
import { useUserImageSrc } from "@/hooks/use-user-image-src";
import {
  MAP_ICON_SIZE,
  useMapStore,
  type Bounds,
} from "@/hooks/store/use-map-store";
import { useTranslations } from "next-intl";

import { divIcon, Point } from "leaflet";
import { Marker, Popup, useMap } from "react-leaflet";

export default function UserMarker() {
  const t = useTranslations("pages.map");

  const {
    position,
    userPosition,
    setLoadingUserPosition,
    setPosition,
    setZoom,
    setUserPosition,
    setBounds,
  } = useMapStore();
  const { user } = useAuthStore();

  const avatarSrc = useUserImageSrc(user?.avatar);

  const map = useMap();

  useEffect(() => {
    map
      .locate()
      .on("locationfound", (e) => {
        setLoadingUserPosition(false);

        setUserPosition(e.latlng);

        const b = e.target.getBounds().toBBoxString().split(",");
        const currentBounds: Bounds = {
          latMin: parseFloat(b[1]),
          latMax: parseFloat(b[3]),
          lngMin: parseFloat(b[0]),
          lngMax: parseFloat(b[2]),
        };
        setBounds(currentBounds);

        if (position || userPosition) {
          return;
        }

        setPosition(e.latlng);
        setZoom(e.target.getZoom());

        localStorage.setItem(
          "mapData",
          JSON.stringify({
            position: e.latlng,
            zoom: e.target.getZoom(),
            bounds: currentBounds,
          }),
        );

        map.flyTo(e.latlng, map.getZoom(), { duration: 0.5 });
      })
      .on("locationerror", () => {
        setLoadingUserPosition(false);

        setUserPosition(null);
      });

    return () => {
      map.off();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map]);

  if (!userPosition) {
    return null;
  }

  return (
    <Marker position={userPosition} icon={getIcon(avatarSrc)}>
      <Popup>{t("userLocation")}</Popup>
    </Marker>
  );
}

function getIcon(src: string) {
  return divIcon({
    html: ReactDOMServer.renderToString(
      <Image
        src={src}
        alt="user"
        priority
        width={MAP_ICON_SIZE}
        height={MAP_ICON_SIZE}
        className="absolute left-0 top-0 !h-full !w-full rounded-full object-cover"
      />,
    ),
    iconSize: new Point(MAP_ICON_SIZE, MAP_ICON_SIZE),
    iconAnchor: new Point(MAP_ICON_SIZE / 2, MAP_ICON_SIZE / 2),
    popupAnchor: new Point(0, -(MAP_ICON_SIZE / 2)),
    className: "relative",
  });
}
