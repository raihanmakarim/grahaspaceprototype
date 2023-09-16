"use client";

import React, {
  useState, useCallback, useEffect 
} from "react";
import Map, {
  MapProvider,
  Marker,
  Source,
  Layer,
  NavigationControl,
  FullscreenControl,
  GeolocateControl,
  useMap,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import process from "process";
const MAPBOX_API_KEY = process.env.NEXT_PUBLIC_MAPBOX_API_KEY;

const MapScreen = (props) => { 
  const {
    coord, handleMapClick = () => {}, clickCoord , setCoord, markerArray,polygon,
    MRTPoints,trainPoints,haltePoints, tollPoints, stationTransitPoints, haltetTransitPoints,
    showMRT, showTrain, showHalte, showToll, showStationTransit, showHaltetTransit,showPolygon, coordinates, showCoordinates, showWorship,
    showSchool,
    showDining,
    showPlaza,
    showMarket,
    schoolPoints,
    worshipPoints,
    diningPoints,
    plazaPoints,
    marketPoints,
  } = props;
  const [marker, setMarker] = useState({
    latitude: 0,
    longitude: 0,
  });

  const { map } = useMap();

  const onClick = () => {
    map.flyTo({ center: [ coord.longitude, coord.latitude] });
  };

  useEffect(() => {
    if (coord.latitude !== 0 && coord.longitude !== 0) {
      // onClick();
    }
  }, [coord]);


  const handleOnGeolocate = useCallback((e) => {
    setCoord({
      latitude: e.coords?.latitude,
      longitude: e.coords?.longitude,
    });
  }, []);

  const handleMapClickWrapper = (event) => {
    setMarker({
      longitude: event.lngLat.lng,
      latitude: event.lngLat.lat,
    });
    clickCoord(marker);

    handleMapClick(event);
  };

  

  return (
    <div key="map">
      <MapProvider>
        <Map
          id="map"
          initialViewState={{
            longitude: coord.longitude,
            latitude: coord.latitude,
            zoom: 15,
          }}
          mapboxAccessToken={MAPBOX_API_KEY}
          style={{
            width: "100vw",
            height: "92vh",
            // marginTop: "8vh",
          }}
          mapStyle="mapbox://styles/mapbox/streets-v9"
          onClick={handleMapClickWrapper}
        >
         
          {showCoordinates ? (
            coordinates.map((coord, index) => (
              <Marker key={index} longitude={coord.longitude} latitude={coord.latitude} />
            ))
          ) : (
            <Marker longitude={coord.longitude} latitude={coord.latitude} />
          )}

          <NavigationControl position="bottom-right" />
          <FullscreenControl />
          <Source id="my-data" type="geojson" data={polygon}>
            { showPolygon && <Layer
              id="polygon"
              type="fill"
              source="my-data"
              paint={{
                "fill-color": "#088",
                "fill-opacity": 0.8,
              }}

              
            />}
          </Source>


          

          {showTrain && trainPoints?.length > 0 && trainPoints?.map((marker) => (
            <Marker
              key={marker.id}
              longitude={marker.center[0]}
              latitude={marker.center[1]}
              color="#0074E4"
            />
          ))}

          {showHalte && haltePoints?.length > 0 && haltePoints?.map((marker) => (
            <Marker
              key={marker.id}
              longitude={marker.center[0]}
              latitude={marker.center[1]}
              color="#00A651"
            />
          ))}

          { showToll && tollPoints?.length > 0 && tollPoints?.map((marker) => (
            <Marker
              key={marker.id}
              longitude={marker.center[0]}
              latitude={marker.center[1]}
              color="#FFD700"
            />
          ))}

          {showHaltetTransit && haltetTransitPoints?.length > 0 && haltetTransitPoints?.map((marker) => (
            <Marker
              key={marker.id}
              longitude={marker.center[0]}
              latitude={marker.center[1]}
              color="#770A7F"
            />
          ))}

          {showStationTransit && stationTransitPoints?.length > 0 && stationTransitPoints?.map((marker) => (
            <Marker
              key={marker.id}
              longitude={marker.center[0]}
              latitude={marker.center[1]}
              color="EB584E"
            />
          ))}
          { showMRT && MRTPoints?.length > 0 && MRTPoints?.map((marker) => (
            <Marker
              key={marker.id}
              longitude={marker.center[0]}
              latitude={marker.center[1]}
              color="#FF5733"
              
            />
          ))}

          { showWorship && worshipPoints?.length > 0 && worshipPoints?.map((marker) => (
            <Marker
              key={marker.id}
              longitude={marker.center[0]}
              latitude={marker.center[1]}
              color="#9bb0ae"
              
            />
          ))}

          { showDining && diningPoints?.length > 0 && diningPoints?.map((marker) => (
            <Marker
              key={marker.id}
              longitude={marker.center[0]}
              latitude={marker.center[1]}
              color="#17130d"
              
            />
          ))}

          { showMarket && marketPoints?.length > 0 && marketPoints?.map((marker) => (
            <Marker
              key={marker.id}
              longitude={marker.center[0]}
              latitude={marker.center[1]}
              color="#6a6669"
              
            />
          ))}

          { showSchool && schoolPoints?.length > 0 && schoolPoints?.map((marker) => (
            <Marker
              key={marker.id}
              longitude={marker.center[0]}
              latitude={marker.center[1]}
              color="#8c94a2"
              
            />
          ))}

          { showPlaza && plazaPoints?.length > 0 && plazaPoints?.map((marker) => (
            <Marker
              key={marker.id}
              longitude={marker.center[0]}
              latitude={marker.center[1]}
              color="#c15a43"
              
            />
          ))}


            



          <GeolocateControl onGeolocate={(e) => handleOnGeolocate(e) } />
        </Map>
      </MapProvider>
   
    </div>
  );
};

export default MapScreen;
