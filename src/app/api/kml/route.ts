import { NextResponse } from 'next/server';
import { Coordinate, County } from '@/app/model/types';
import { parseStringPromise, ParsedXml } from 'xml2js';

export async function GET() {
  try {
    const kmlUrl = process.env.KML_URL;

    if (!kmlUrl) {
      throw new Error("KML URL doesn't exist");
    }

    const text = await (await fetch(kmlUrl)).text();
    const xmlDoc = await parseStringPromise(text);
    return buildSuccessResponse(extractCountiesFromKML(xmlDoc), 200);
  } catch (error) {
    console.error('Error loading KML:', error);
    return buildErrorResponse(error, 500);
  }
}

const extractCountiesFromKML = (xmlDoc: ParsedXml): County[] => {
  // Extract county data from KML `<Placemark>`
  const placemarks = xmlDoc.kml.Document[0].Folder[0].Placemark || []; // Get all Placemark elements from the parsed XML

  return placemarks
    .map((placemark) => {
      // Extract county name from `ctyua_name`
      const nameElement =
        placemark.ExtendedData?.[0]?.SchemaData?.[0]?.SimpleData?.find(
          (el: { $: { name: string }; _: string }) => el.$.name === 'COUNTY',
        );

      return {
        name: nameElement?._ ?? 'Unknown', // Handle missing county names
        coordinates: extractCoordinatesFromKML(placemark),
      } as County;
    })
    .filter((county): county is County => county !== null); // Filter out null values
};

function extractCoordinatesFromKML(placemark: any): Coordinate[][] {
  // Initialize an empty array to hold arrays of coordinates
  const coordinates: Coordinate[][] = [];

  const parseCoordinates = (
    coordinatesText: string | undefined,
  ): Coordinate[] => {
    if (!coordinatesText) return [];

    return coordinatesText
      .trim()
      .split(/\s+/) // Use regex to handle multiple spaces
      .map((coord) => {
        const [lng, lat] = coord.split(',').map(Number);
        if (isNaN(lat) || isNaN(lng)) {
          console.warn('Invalid coordinate found:', coord);
          return null; // Mark invalid entries
        }
        return { lat, lng };
      })
      .filter((coord): coord is Coordinate => coord !== null); // Remove invalid entries
  };

  // Check if we have a MultiGeometry, and handle it accordingly
  if (placemark.MultiGeometry) {
    // MultiGeometry can have multiple Polygons
    placemark.MultiGeometry[0].Polygon?.forEach((polygon: any) => {
      const coordinatesText =
        polygon?.outerBoundaryIs?.[0]?.LinearRing?.[0]?.coordinates?.[0];
      const parsed = parseCoordinates(coordinatesText);
      if (parsed.length > 0) coordinates.push(parsed);
    });
  } else if (placemark.Polygon) {
    // If not MultiGeometry, it should be a regular Polygon
    const coordinatesText =
      placemark.Polygon?.[0]?.outerBoundaryIs?.[0]?.LinearRing?.[0]
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

export async function buildErrorResponse(error: unknown, statusCode: number) {
  // Ensure the error is an instance of Error
  const errorMessage = error instanceof Error ? error.message : String(error);

  return NextResponse.json(
    {
      content: { error: errorMessage },
      statusCode,
    },
    { status: statusCode },
  );
}
