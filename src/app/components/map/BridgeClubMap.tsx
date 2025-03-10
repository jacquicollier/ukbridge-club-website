'use client';

import { APIProvider, Map } from '@vis.gl/react-google-maps';
import Counties from '@/app/components/map/Counties';
import PoiMarkers from '@/app/components/map/PoiMarkers';
import { Country, County, Poi } from '@/app/model/types';
import { defaultBounds, pois } from '@/app/model/constants';
import Polygon = google.maps.Polygon;

const containerStyle = {
  width: '100%',
  height: '100%',
};

const BridgeClubMap = (props: {
  pois: Poi[];
  selectedCountry: Country | null;
  selectedCounty: County | null;
  onPoisFiltered: (pois: Poi[]) => void;
}) => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API!;

  function onPolygonsSet(polygons: Polygon[]) {
    function getMarkersInsidePolygon(markers: Poi[], polygons: Polygon[]) {
      return markers.filter((marker) =>
        polygons.some((polygon) =>
          google.maps.geometry.poly.containsLocation(
            new google.maps.LatLng(marker.location.lat, marker.location.lng),
            polygon,
          ),
        ),
      );
    }

    if (!polygons || polygons.length === 0) {
      props.onPoisFiltered(pois);
    } else {
      props.onPoisFiltered(getMarkersInsidePolygon(pois, polygons));
    }
  }

  return (
    <APIProvider apiKey={apiKey}>
      <Map
        defaultBounds={defaultBounds}
        mapId='da37f3254c6a6d1c'
        style={containerStyle}
        fullscreenControl={false}
        streetViewControl={false}
        mapTypeControl={false}
        // restriction={{ latLngBounds: defaultBounds }}
      >
        <Counties
          selectedCountry={props.selectedCountry}
          selectedCounty={props.selectedCounty}
          onPolygonsSet={onPolygonsSet}
        />
        <PoiMarkers pois={props.pois} />
      </Map>
    </APIProvider>
  );
};

export default BridgeClubMap;
