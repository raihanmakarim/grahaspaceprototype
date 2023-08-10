import React from "react";
import process from "process";
import boundaryBox from "../helper/boundaryBox";

const MAPBOX_API_KEY = process.env.NEXT_PUBLIC_MAPBOX_API_KEY;


const getNearbyPlaces = async (longitude, latitude, types, bbox, limit) => {
  const API_KEY = MAPBOX_API_KEY;
  const baseUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places";
  const endpoint = `${baseUrl}/${types.join(",")}.json`;
  const response = await fetch(
    `${endpoint}?bbox=${bbox.join(
      "%2C"
    )}&limit=${limit}&proximity=${longitude}%2C${latitude}&access_token=${API_KEY}`
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return data.features;
};

const Score = async ({ coord }) => {
  const marketTypes = ["convenience_store", "supermarket", "grocery"];
  const busTypes = ["bus station"];
  const MRTTypes = ["MRT"];
  const trainTypes = ["train_station"];

  const bbox5km = boundaryBox(coord.longitude, coord.latitude, 5);
  const bbox10km = boundaryBox(coord.longitude, coord.latitude, 10);

  const marketData = await getNearbyPlaces(
    coord.longitude,
    coord.latitude,
    marketTypes,
    bbox1km,
    5
  );

  const MRTData = await getNearbyPlaces(
    coord.longitude,
    coord.latitude,
    marketTypes,
    MRTTypes,
    5
  );

  const busData = await getNearbyPlaces(
    coord.longitude,
    coord.latitude,
    busTypes,
    bbox1km,
    5
  );

  const trainData = await getNearbyPlaces(
    coord.longitude,
    coord.latitude,
    trainTypes,
    bbox1km,
    5
  );

  return <div>Score</div>;
};

export default Score;
