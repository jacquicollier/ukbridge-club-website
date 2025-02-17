'use client';

import { Coordinate, Country, County } from '@/app/model/types';
import { useMap } from '@vis.gl/react-google-maps';
import { useEffect, useState } from 'react';

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
}) => {
  const map = useMap();

  const [polygons, setPolygons] = useState<google.maps.Polygon[]>([]);

  useEffect(() => {
    if (!map) return;

    polygons.forEach((polygon) => polygon.setMap(null));

    if (!props.selectedCountry || !props.selectedCounty) {
      const bounds = new google.maps.LatLngBounds();
      bounds.extend(new google.maps.LatLng(49.959999905, -7.57216793459));
      bounds.extend(new google.maps.LatLng(58.6350001085, 1.68153079591));
      map.fitBounds(bounds);
      return;
    }

    const loadCounty = async () => {
      try {
        const coordinates = await fetchCounty(
          props.selectedCountry!.id,
          props.selectedCounty!.id,
        );

        setPolygons([
          new google.maps.Polygon({
            paths: coordinates,
            strokeColor: '#000000',
            strokeOpacity: 0.8,
            strokeWeight: 1,
            fillColor: '#FF0000',
            fillOpacity: 0.35,
            map: map,
          }),
        ]);

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
