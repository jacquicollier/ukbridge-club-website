'use client';

import { Coordinate, Country, County } from '@/app/model/types';
import { useMap } from '@vis.gl/react-google-maps';
import { useEffect, useState } from 'react';
import { defaultBounds } from '@/app/model/constants';
import Polygon = google.maps.Polygon;

async function fetchCounty(
  country: string,
  county: string,
): Promise<Coordinate[][]> {
  try {
    const response = await fetch(`/county-borders/${country}/${county}.json`);

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    return await response.json();
  } catch (err) {
    console.error('Error fetching county:', err);
    throw err;
  }
}

const Counties = (props: {
  selectedCountry: Country | null;
  selectedCounty: County | null;
  onPolygonsSet: (polygons: Polygon[]) => void;
}) => {
  const map = useMap();

  const [polygons, setPolygons] = useState<google.maps.Polygon[]>([]);

  useEffect(() => {
    if (!map) return;

    polygons.forEach((polygon) => polygon.setMap(null));

    if (!props.selectedCountry || !props.selectedCounty) {
      setPolygons([]);
      props.onPolygonsSet([]);
      map.fitBounds(defaultBounds);
      return;
    }

    const loadCounty = async () => {
      try {
        const coordinates = await fetchCounty(
          props.selectedCountry!.id,
          props.selectedCounty!.id,
        );

        const polygons = [
          new google.maps.Polygon({
            paths: coordinates,
            strokeColor: '#000000',
            strokeOpacity: 0.8,
            strokeWeight: 1,
            fillColor: '#FF0000',
            fillOpacity: 0.35,
            map: map,
          }),
        ];

        setPolygons(polygons);
        props.onPolygonsSet(polygons);

        const bounds = new google.maps.LatLngBounds();

        coordinates.forEach((polygon) => {
          polygon.forEach((coord) => {
            bounds.extend(new google.maps.LatLng(coord.lat, coord.lng));
          });
        });

        map.fitBounds(bounds);
      } catch (err) {
        console.error(err);
      }
    };

    loadCounty();
  }, [map, props.selectedCountry, props.selectedCounty]);
  return null;
};

export default Counties;
