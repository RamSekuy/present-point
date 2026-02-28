import { TCoordinates } from "@/model/coordinates.type";

export function getDistance(position1: TCoordinates, position2: TCoordinates) {
  const R = 6371000; // meter
  const toRad = (deg: number) => (deg * Math.PI) / 180;

  const lat1 = toRad(position1.latitude);
  const lat2 = toRad(position2.latitude);
  const dLat = toRad(position2.latitude - position1.latitude);
  const dLon = toRad(position2.longitude - position1.longitude);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // meter
}
