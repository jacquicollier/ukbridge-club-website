'use client';

import { useMap } from '@vis.gl/react-google-maps';
import { useEffect, useRef, useState } from 'react';
import { Coordinate, Country, County } from '@/app/clubs/model/types';
import { defaultBounds } from '@/app/clubs/model/constants';

const Counties = ({
  country,
  county,
}: {
  country: Country | null;
  county: County | null;
}) => {
  const map = useMap();
  const polygonsRef = useRef<google.maps.Polygon[]>([]);
  const [coordinates, setCoordinates] = useState<Coordinate[][]>([]);

  useEffect(() => {
    const fetchCounty = async () => {
      try {
        const response = await fetch(
          `https://boundaries.ukbridge.club/${country!.id}/${county!.id}.json`,
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        setCoordinates(await response.json());
      } catch (err) {
        console.error('Error fetching county:', err);
        throw err;
      }
    };

    if (!county) {
      polygonsRef.current.forEach((polygon) => polygon.setMap(null));
      polygonsRef.current = [];
    }

    if (country && county) {
      fetchCounty();
    }
  }, [country, county]);

  useEffect(() => {
    if (!map) return;

    // Clear previous polygons
    polygonsRef.current.forEach((polygon) => polygon.setMap(null));
    polygonsRef.current = [];

    if (coordinates.length === 0) {
      map.fitBounds(defaultBounds);
      return;
    }

    polygonsRef.current = coordinates.map(
      (path) =>
        new google.maps.Polygon({
          paths: path,
          strokeColor: '#000000',
          strokeOpacity: 0.8,
          strokeWeight: 1,
          fillColor: '#FF0000',
          fillOpacity: 0.35,
          map,
        }),
    );

    // // Fit bounds to the new polygons
    // const bounds = new google.maps.LatLngBounds();
    // coordinates.forEach((polygon) =>
    //   polygon.forEach(({ lat, lng }) =>
    //     bounds.extend(new google.maps.LatLng(lat, lng)),
    //   ),
    // );
    //
    // map.fitBounds(bounds);

    return () => {
      // Cleanup on unmount
      polygonsRef.current.forEach((polygon) => polygon.setMap(null));
      polygonsRef.current = [];
    };
  }, [map, coordinates]);

  return null;
};

export default Counties;
