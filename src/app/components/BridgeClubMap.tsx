'use client';

import {
  APIProvider,
  Map,
  MapCameraChangedEvent,
} from '@vis.gl/react-google-maps';
import Counties from '@/app/components/Counties';
import { County } from '@/app/model/types';
// import MapMask from "@/app/components/MapMask";
import { useState } from 'react';
import PoiMarkers from '@/app/components/PoiMarkers';
import { england } from '@/app/model/england';
import { scotland } from '@/app/model/scotland';
import { wales } from '@/app/model/wales';
import { northernIreland } from '@/app/model/northern-ireland';
const containerStyle = {
  width: '100%',
  height: '100%',
};

const BridgeClubMap = (props: {
  selectedCounty: County | null;
  onCountiesLoaded: (counties: County[]) => void;
  onSelectedCounty: (county: County) => void;
}) => {
  const defaultCenter = { lat: 52.3555, lng: -1.1743 }; // UK Center
  const defaultZoom = 6;

  return (
    <APIProvider apiKey='AIzaSyCgWG8HhEPvmF_Qw2KaKG2N86mDDXaNwcA'>
      <Map
        defaultZoom={defaultZoom}
        defaultCenter={defaultCenter}
        onCameraChanged={(ev: MapCameraChangedEvent) =>
          console.log(
            'camera changed:',
            ev.detail.center,
            'zoom:',
            ev.detail.zoom,
          )
        }
        mapId='da37f3254c6a6d1c'
        style={containerStyle}
        fullscreenControl={false}
        streetViewControl={false}
        mapTypeControl={false}
      >
        <Counties
          selectedCounty={props.selectedCounty}
          onCountiesLoaded={props.onCountiesLoaded}
          onSelectedCounty={props.onSelectedCounty}
        />
        <PoiMarkers
          pois={[...england, ...scotland, ...wales, ...northernIreland]}
        />
        {/*<MapMask counties={counties} />*/}
        {/*<MapStyling />*/}
      </Map>
    </APIProvider>
  );
};

export default BridgeClubMap;
