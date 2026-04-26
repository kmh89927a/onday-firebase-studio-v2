'use client';

import React, { useEffect, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { useMapContext } from './MapContext';

export default function MapView() {
  const { filteredCandidates, setSelectedId, selectedId } = useMapContext();
  const [center, setCenter] = useState({ lat: 37.5665, lng: 126.9780 });

  // Update map center to the average of filtered candidates
  useEffect(() => {
    if (filteredCandidates.length > 0) {
      const avgLat = filteredCandidates.reduce((acc, c) => acc + c.lat, 0) / filteredCandidates.length;
      const avgLng = filteredCandidates.reduce((acc, c) => acc + c.lng, 0) / filteredCandidates.length;
      setCenter({ lat: avgLat, lng: avgLng });
    }
  }, [filteredCandidates]);

  return (
    <Map
      center={center}
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
