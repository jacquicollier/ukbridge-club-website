// Not used but may be good for caching?
export type Bound = {
  north: number;
  south: number;
  east: number;
  west: number;
};
export type Coordinate = { lat: number; lng: number };
export type County = { name: string; coordinates: Coordinate[][] };
export type Poi = { key: string; location: google.maps.LatLngLiteral };
