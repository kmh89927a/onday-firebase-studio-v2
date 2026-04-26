
'use client';

import React from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { useMapContext } from './MapContext';

export default function MapView() {
  const { filteredCandidates, setSelectedId, selectedId } = useMapContext();

  return (
    <Map
      center={{ lat: 37.5665, lng: 126.9780 }}
      style={{ width: '100%', height: '100%' }}
      level={7}
    >
      {filteredCandidates.map((c) => (
        <MapMarker
          key={c.id}
          position={{ lat: c.lat, lng: c.lng }}
          onClick={() => setSelectedId(c.id)}
          image={{
            src: selectedId === c.id 
              ? 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png' 
              : 'https://t1.daumcdn.net/mapjsapi/images/2.0/marker_default.png',
            size: { width: 24, height: 35 }
          }}
        />
      ))}
    </Map>
  );
}
