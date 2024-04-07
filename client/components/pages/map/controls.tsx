"use client";

import { useMapStore } from "@/hooks/store/use-map-store";
import { useMap } from "react-leaflet";

import { Button } from "@/components/ui/button";
import { LocateFixed, LocateOff, ZoomIn, ZoomOut } from "lucide-react";

export default function Controls() {
  const { userPosition } = useMapStore();

  const map = useMap();

  const locationIcon = userPosition ? (
    <LocateFixed className="h-4 w-4" />
  ) : (
    <LocateOff className="h-4 w-4" />
  );

  function locationOnClick() {
    if (!userPosition) {
      return;
    }

    map.flyTo(userPosition, 16, { animate: false });
  }

  return (
    <>
      <div className="absolute left-2 top-2 z-[9999] flex flex-col gap-1 md:bottom-2 md:top-auto">
        <Button variant="outline" size="icon" onClick={locationOnClick}>
          {locationIcon}
        </Button>

        <div className="flex flex-col gap-px">
          <Button variant="outline" size="icon" onClick={() => map.zoomIn()}>
            <ZoomIn className="h-4 w-4" />
          </Button>

          <Button variant="outline" size="icon" onClick={() => map.zoomOut()}>
            <ZoomOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </>
  );
}
