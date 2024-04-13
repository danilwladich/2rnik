"use client";

import { Point, divIcon, type LatLngExpression } from "leaflet";
import { Marker } from "react-leaflet";
import { MAP_ICON_SIZE } from "@/hooks/store/use-map-store";

import MapMainContainer from "@/components/common/map-container/map-main-container";

export default function MapContainer({
  position,
}: {
  position: LatLngExpression;
}) {
  return (
    <MapMainContainer
      position={position}
      zoom={16}
      props={{ scrollWheelZoom: false }}
    >
      <Marker position={position} icon={getIcon()} />
    </MapMainContainer>
  );
}

function getIcon() {
  return divIcon({
    html: `<img src="./assets/map-pin.png" class="h-full w-full" />`,
    iconSize: new Point(MAP_ICON_SIZE, MAP_ICON_SIZE),
    iconAnchor: new Point(MAP_ICON_SIZE / 2, MAP_ICON_SIZE),
    popupAnchor: new Point(0, -MAP_ICON_SIZE),
    className: "",
  });
}
