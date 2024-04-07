"use client";

import { Marker, Popup, useMap } from "react-leaflet";
import type { MarkerType } from "@/types/MarkersType";
import type { DivIcon } from "leaflet";

export default function MarkerItem({
  lat,
  lng,
  name,
  address,
  images,
  icon,
}: MarkerType & { icon: DivIcon }) {
  const map = useMap();

  function onCLick() {
    const zoom = map.getZoom();

    if (zoom > 15) {
      map.flyTo([lat, lng], zoom, { duration: 0.5 });
      return;
    }

    map.flyTo([lat, lng], 15, { duration: 0.5 });
  }

  const imageSrc = images[0].url;

  return (
    <Marker
      position={[lat, lng]}
      icon={icon}
      eventHandlers={{ click: onCLick }}
    >
      <Popup autoPan={false}>
        <div className="flex flex-col gap-2">
          <h3 className="text-base font-bold">{name}</h3>

          <span>{address}</span>

          <div className="relative h-0 w-full pb-[56%]">
            <img
              src={imageSrc}
              alt={name}
              className="absolute left-0 top-0 h-full w-full object-cover"
            />
          </div>
        </div>
      </Popup>
    </Marker>
  );
}
