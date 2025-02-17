'use client';

import { APIProvider, Map } from '@vis.gl/react-google-maps';
import Counties from '@/app/components/Counties';
import PoiMarkers from '@/app/components/PoiMarkers';
import { england } from '@/app/model/england';
import { scotland } from '@/app/model/scotland';
import { wales } from '@/app/model/wales';
import { northernIreland } from '@/app/model/northern-ireland';
import { Country, County } from '@/app/model/types';

const containerStyle = {
  width: '100%',
  height: '100%',
};

const BridgeClubMap = (props: {
  selectedCountry: Country | null;
  selectedCounty: County | null;
}) => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API!;

  return (
    <APIProvider apiKey={apiKey}>
      <Map
        mapId='da37f3254c6a6d1c'
        style={containerStyle}
        fullscreenControl={false}
        streetViewControl={false}
        mapTypeControl={false}
      >
        <Counties
          selectedCountry={props.selectedCountry}
          selectedCounty={props.selectedCounty}
        />
        <PoiMarkers
          pois={[...england, ...scotland, ...wales, ...northernIreland]}
        />
      </Map>
    </APIProvider>
  );
};

export default BridgeClubMap;
