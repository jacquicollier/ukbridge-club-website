import { NextResponse } from 'next/server';
import { Coordinate, County } from '@/app/model/types';
import { parseStringPromise } from 'xml2js';

export async function GET() {
  try {
    const kmlUrl = process.env.KML_URL;

    if (!kmlUrl) {
      throw new Error("KML URL doesn't exist");
    }

    const response = await fetch(kmlUrl);
    const text = await response.text();

    const counties = await extractCountiesFromKML(text);
    return buildSuccessResponse(counties, 200);
  } catch (error) {
    console.error('Error loading KML:', error);
    return buildErrorResponse(error, 500);
  }
}

// Define a type for Placemark
interface Placemark {
  ExtendedData?: {
    SchemaData?: {
      SimpleData?: { $: { name: string }; _: string }[];
    }[];
  }[];
  MultiGeometry?: {
    Polygon?: {
      outerBoundaryIs?: {
        LinearRing?: { coordinates?: string[] }[];
      }[];
    }[];
  }[];
  Polygon?: {
    outerBoundaryIs?: {
      LinearRing?: { coordinates?: string[] }[];
    }[];
  }[];
}

async function extractCountiesFromKML(text: string): Promise<County[]> {
  const parsedData = await parseStringPromise(text);
  const placemarks: Placemark[] =
    parsedData?.kml?.Document?.[0]?.Folder?.[0]?.Placemark || [];

  return placemarks
    .map((placemark) => {
      const nameElement =
        placemark.ExtendedData?.[0]?.SchemaData?.[0]?.SimpleData?.find(
          (el) => el.$.name === 'COUNTY',
        );

      if (!nameElement) return null;

      return {
        name: nameElement._ ?? 'Unknown',
        coordinates: extractCoordinatesFromKML(placemark),
      };
    })
    .filter((county): county is County => county !== null); // Proper type guard
}

function extractCoordinatesFromKML(placemark: Placemark): Coordinate[][] {
  const coordinates: Coordinate[][] = [];

  const parseCoordinates = (coordinatesText?: string): Coordinate[] => {
    if (!coordinatesText) return [];

    return coordinatesText
      .trim()
      .split(/\s+/)
      .map((coord) => {
        const [lng, lat] = coord.split(',').map(Number);
        return isNaN(lat) || isNaN(lng) ? null : { lat, lng };
      })
      .filter((coord): coord is Coordinate => coord !== null);
  };

  if (placemark.MultiGeometry?.[0]?.Polygon) {
    placemark.MultiGeometry[0].Polygon.forEach((polygon) => {
      const coordinatesText =
        polygon?.outerBoundaryIs?.[0]?.LinearRing?.[0]?.coordinates?.[0];
      const parsed = parseCoordinates(coordinatesText);
      if (parsed.length > 0) coordinates.push(parsed);
    });
  } else if (placemark.Polygon?.[0]) {
    const coordinatesText =
      placemark.Polygon[0]?.outerBoundaryIs?.[0]?.LinearRing?.[0]
        ?.coordinates?.[0];
    const parsed = parseCoordinates(coordinatesText);
    if (parsed.length > 0) coordinates.push(parsed);
  }

  return coordinates;
}

function buildSuccessResponse(data: County[], statusCode: number) {
  return NextResponse.json(
    {
      content: data,
      statusCode,
    },
    { status: statusCode },
  );
}

function buildErrorResponse(error: unknown, statusCode: number) {
  const errorMessage = error instanceof Error ? error.message : String(error);

  return NextResponse.json(
    {
      content: { error: errorMessage },
      statusCode,
    },
    { status: statusCode },
  );
}
