"use client";

import React, {
  useState, useCallback, useEffect 
} from "react";
import Map, {
  MapProvider,
  Marker,
  NavigationControl,
  FullscreenControl,
  GeolocateControl,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import process from "process";
const MAPBOX_API_KEY = process.env.NEXT_PUBLIC_MAPBOX_API_KEY;

const MapScreen = (props) => {
  const {
    coord, handleMapClick = () => {}, clickCoord 
  } = props;
  const [marker, setMarker] = useState({
    latitude: 0,
    longitude: 0,
  });

  const handleMapClickWrapper = (event) => {
    console.log(event.lngLat);
    setMarker({
      longitude: event.lngLat.lng,
      latitude: event.lngLat.lat,
    });
    clickCoord(marker);

    handleMapClick(event);
  };

  return (
    <>
      <MapProvider>
        <Map
          initialViewState={{
            longitude: coord.longitude,
            latitude: coord.latitude,
            zoom: 15,
          }}
          mapboxAccessToken={MAPBOX_API_KEY}
          style={{
            width: "100vw",
            height: "92vh",
            marginTop: "8vh",
          }}
          mapStyle="mapbox://styles/mapbox/streets-v9"
          onClick={handleMapClickWrapper}
        >
          <Marker longitude={marker.longitude} latitude={marker.latitude} />
          <NavigationControl position="bottom-right" />
          <FullscreenControl />

          <GeolocateControl />
        </Map>
      </MapProvider>
      {/* Example buttons to trigger the nearby searches */}
     
    </>
  );
};

export default MapScreen;
