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
