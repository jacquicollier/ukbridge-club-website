'use client';

import { APIProvider, Map } from '@vis.gl/react-google-maps';
import Counties from '@/app/components/map/Counties';
import PoiMarkers from '@/app/components/map/PoiMarkers';
import { Country, County, Poi } from '@/app/model/map/types';
import { defaultBounds } from '@/app/model/map/constants';

const containerStyle = {
  width: '100%',
  height: '100%',
};

const BridgeClubMap = (props: {
  pois: Poi[];
  selectedCountry: Country | null;
  selectedCounty: County | null;
}) => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API!;

  return (
    <APIProvider apiKey={apiKey}>
      <Map
        defaultBounds={defaultBounds}
        mapId='da37f3254c6a6d1c'
        style={containerStyle}
        fullscreenControl={false}
        streetViewControl={false}
        mapTypeControl={false}
        restriction={{ latLngBounds: defaultBounds }}
      >
        <Counties
          country={props.selectedCountry}
          county={props.selectedCounty}
        />
        <PoiMarkers pois={props.pois} />
      </Map>
    </APIProvider>
  );
};

export default BridgeClubMap;
