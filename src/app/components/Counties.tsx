'use client';

import { County } from '@/app/model/types';
import { useMap } from '@vis.gl/react-google-maps';
import { useEffect, useState } from 'react';

async function fetchCounties(): Promise<County[]> {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_KML_URL!);

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();

    if (data?.statusCode !== 200) {
      throw new Error(data.content?.error || 'Unknown error');
    }

    return data.content;
  } catch (err) {
    console.error('Error fetching counties:', err);
    throw err; // Rethrow error to handle it in useEffect
  }
}

const Counties = (props: {
  selectedCounty: County | null;
  onCountiesLoaded: (counties: County[]) => void;
  onSelectedCounty: (county: County) => void;
}) => {
  const map = useMap();
  // const kmlLayerRef = useRef<google.maps.KmlLayer | null>(null);

  const [counties, setCounties] = useState<County[]>([]);
  const [polygons, setPolygons] = useState<google.maps.Polygon[]>([]);

  useEffect(() => {
    const loadCounties = async () => {
      // setLoading(true);
      // setError(null); // Reset any previous errors

      try {
        const data = await fetchCounties();
        setCounties(data);
        props.onCountiesLoaded(data);
      } catch (err) {
        console.error(err);
        // setError(
        //   err instanceof Error
        //     ? err.message
        //     : 'An error occurred while fetching counties',
        // );
      } finally {
        // setLoading(false);
      }
    };

    loadCounties();
  }, []);

  useEffect(() => {
    if (!map) return;

    // Remove existing polygons
    polygons.forEach((polygon) => polygon.setMap(null));

    // Draw new polygons
    const newPolygons: google.maps.Polygon[] = counties.map((county) => {
      const polygon = new google.maps.Polygon({
        paths: county.coordinates,
        strokeColor: '#000000',
        strokeOpacity: 0.8,
        strokeWeight: 1,
        fillColor: '#FF0000', // ✅ Ensure polygon has a fill color
        fillOpacity: 0.35, // ✅ Make it clickable
        map: map,
      });

      // 🟡 Click event: Zoom to the county
      polygon.addListener('click', () => {
        const bounds = new google.maps.LatLngBounds();

        county.coordinates.flat().forEach((coord) => {
          bounds.extend(new google.maps.LatLng(coord.lat, coord.lng));
        });

        props.onSelectedCounty(county);
        map.fitBounds(bounds); // Zoom into the county
      });

      return polygon;
    });

    setPolygons(newPolygons);

    return () => {
      newPolygons.forEach((polygon) => polygon.setMap(null));
    };
  }, [map, counties]);

  useEffect(() => {
    if (map && counties.length > 0 && props.selectedCounty) {
      const bounds = new google.maps.LatLngBounds();
      const county = counties.find(
        (county) => county.name === props.selectedCounty?.name,
      );

      if (county) {
        county.coordinates.forEach((polygon) => {
          polygon.forEach((coord) => {
            bounds.extend(new google.maps.LatLng(coord.lat, coord.lng));
          });
        });

        map.fitBounds(bounds);
      }
    }
  }, [map, counties, props.selectedCounty]);

  return null;
};

export default Counties;
