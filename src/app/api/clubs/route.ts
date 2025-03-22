import { NextRequest, NextResponse } from 'next/server';
import { findPois } from '@/app/api/clubs/utils/pois';
import { Coordinate, Poi } from '@/app/model/map/types';
import { booleanPointInPolygon, point, polygon } from '@turf/turf';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const country = searchParams.get('country');
  const county = searchParams.get('county');
  const postcode = searchParams.get('postcode');

  try {
    const pois = await findPois();

    if (country && county) {
      const response = await fetch(
        `https://boundaries.ukbridge.club/${country}/${county}.json`,
      );
      const coordinates = (await response.json()) as Coordinate[][];

      return NextResponse.json(
        getMarkersInsidePolygon(
          pois,
          coordinates.map((path) =>
            path.map((coord) => [coord.lng, coord.lat]),
          ),
        ),
      );
    }

    if (postcode) {
      const latLng = await getCoordinates(postcode);

      if (latLng !== null) {
        return NextResponse.json(getNearestMarkers(latLng!, pois));
      }
    }

    return NextResponse.json(pois);
  } catch (error) {
    console.error('Error fetching from S3:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 },
    );
  }
}

function getMarkersInsidePolygon(
  markers: Poi[],
  polygons: number[][][],
): Poi[] {
  return markers.filter((marker) =>
    polygons.some((poly) =>
      booleanPointInPolygon(
        point([marker.location.lng, marker.location.lat]),
        polygon([poly]),
      ),
    ),
  );
}

function getNearestMarkers(
  postcodeLocation: { lat: number; lng: number },
  markers: Poi[],
  count: number = 10,
): Poi[] {
  return markers
    .map((marker) => ({
      ...marker,
      distance: haversineDistance(postcodeLocation, marker.location),
    }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, count);
}

function haversineDistance(
  coord1: { lat: number; lng: number },
  coord2: { lat: number; lng: number },
): number {
  const R = 6371; // Radius of Earth in km
  const toRad = (deg: number) => (deg * Math.PI) / 180;

  const dLat = toRad(coord2.lat - coord1.lat);
  const dLng = toRad(coord2.lng - coord1.lng);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(coord1.lat)) *
      Math.cos(toRad(coord2.lat)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in km
}

async function getCoordinates(
  postcode: string,
): Promise<{ lat: number; lng: number } | null> {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(postcode)}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API}`,
  );

  const data = await response.json();

  if (data.status !== 'OK' || !data.results.length) return null;

  const { lat, lng } = data.results[0].geometry.location;
  return { lat, lng };
}
