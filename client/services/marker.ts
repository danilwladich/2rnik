import { db } from "@/lib/db";
import type { Marker } from "@prisma/client";

export async function getMarkerById(id: string) {
  return db.marker.findFirst({
    where: {
      id,
    },
  });
}

export async function getMarkers({
  latMin,
  latMax,
  lngMin,
  lngMax,
}: {
  latMin: string;
  latMax: string;
  lngMin: string;
  lngMax: string;
}) {
  return db.marker.findMany({
    where: {
      confirmed: true,
      lat: {
        gte: parseFloat(latMin),
        lte: parseFloat(latMax),
      },
      lng: {
        gte: parseFloat(lngMin),
        lte: parseFloat(lngMax),
      },
    },
  });
}

export async function getUnconfirmedMarkers() {
  return db.marker.findMany({
    where: {
      confirmed: false,
    },
    include: {
      addedBy: true,
    },
  });
}

export async function createMarker(data: {
  name: string;
  lat: number;
  lng: number;
  address: string;
  images: string;
  addedByUserId: string;
  confirmed: boolean;
}) {
  return db.marker.create({
    data,
  });
}

export async function updateMarker(id: string, data: Partial<Marker>) {
  return db.marker.update({
    where: {
      id,
    },
    data,
  });
}

export async function deleteMarker(id: string) {
  return db.marker.delete({
    where: {
      id,
    },
  });
}