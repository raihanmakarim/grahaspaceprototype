"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import MapScreen from "@/app/component/Map";
import Sidebar from "@/app/component/Sidebar";
import Card from "@/app/component/Card";
import { isoChrone, stationTransit, halteTransit } from "@/app/constant";
import PolygonCheck from "@/app/helper/pointsCheck";

const MAPBOX_API_KEY = process.env.NEXT_PUBLIC_MAPBOX_API_KEY;

function convertCoordinatesToFormat(response) {
  const coordinatesArray = response.features[0].geometry.coordinates;
  const formattedCoordinates = coordinatesArray.flatMap((pair) =>
    pair.map((coord) => `${coord[0]}%2C${coord[1]}`)
  );
  const formattedString = formattedCoordinates.join("%2C");

  return formattedString;
}

const getNearbyPlaces = async (longitude, latitude, types, limit) => {
  const API_KEY = MAPBOX_API_KEY;
  const baseUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places";
  const endpoint = `${baseUrl}/${types.join(",")}.json`;

  const response = await fetch(
    `${endpoint}?limit=${limit}&proximity=${longitude}%2C${latitude}&access_token=${API_KEY}`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return data.features;
};

const getIsoChrone = async (longitude, latitude, minutes, type) => {
  const API_KEY = MAPBOX_API_KEY;
  const baseUrl = "https://api.mapbox.com/isochrone/v1/mapbox";
  const endpoint = `${baseUrl}/${type}/${longitude}%2C${latitude}?contours_minutes=${minutes}&generalize=100&polygons=true&denoise=1&access_token=${API_KEY}`;
  const response = await fetch(endpoint);

  const data = await response.json();
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return data;
};

const getDirection = async (origin, destination, type) => {
  const [longitude, latitude] = origin;
  const [longitudeDest, latitudeDest] = destination;
  const API_KEY = MAPBOX_API_KEY;
  const baseUrl = "https://api.mapbox.com/directions/v5/mapbox";
  const queryParameters = new URLSearchParams({
    alternatives: false,
    annotations: "duration",
    geometries: "geojson",
    language: "en",
    overview: "full",
    steps: false,
    access_token: API_KEY,
  });
  const endpoint = `${baseUrl}/${type}/${longitude},${latitude};${longitudeDest},${latitudeDest}?${queryParameters}`;

  try {
    const response = await fetch(endpoint);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch data");
    }

    return response.json();
  } catch (error) {
    throw new Error("An error occurred while processing API data");
  }
};

const bbox = convertCoordinatesToFormat(isoChrone);

export default function Homemap() {
  const [score, setScore] = useState(0);
  const [coord, setCoord] = useState({
    latitude: -6.197912,
    longitude: 106.821562,
  });
  const marketTypes = ["alfamart"];
  const MRTTypes = ["stasiun mrt"];
  const tollTypes = ["toll booth"];
  const diningTypes = ["restaurant"];
  const schoolTypes = ["school"];
  const worshipTypes = ["place of worship"];
  const halteTypes = ["halte"];
  const trainTypes = ["stasiun"];
  const plazaTypes = ["plaza", "mall"];
  const [isoChroneLayer, setIsoChroneLayer] = useState(null);
  const [isoChroneLayerWalking, setIsoChroneLayerWalking] = useState(null);
  const [isoChroneLayerCycling, setIsoChroneLayerCycling] = useState(null);

  const [locationScore, setLocationScore] = useState(0);

  const [marketData, setMarketData] = useState([]);
  const [diningData, setDiningData] = useState([]);
  const [schoolData, setSchoolData] = useState([]);
  const [worshipData, setWorshipData] = useState([]);
  const [plazaData, setPlazaData] = useState([]);

  const [trainData, setTrainData] = useState([]);
  const [routeData, setRouteData] = useState(null);
  const [tollData, setTollData] = useState([]);
  const [halteData, setHalteData] = useState([]);
  const [MRTData, setMRTData] = useState([]);
  const [stationTransitData, setStationTransitData] = useState([]);
  const [halteTransitData, setHalteTransitData] = useState([]);

  const [focusIndex, setFocusIndex] = useState(100);

  const [showPolygon, setShowPolygon] = useState(false);

  const [showTrain, setShowTrain] = useState(false);
  const [showMRT, setShowMRT] = useState(false);
  const [showToll, setShowToll] = useState(false);
  const [showHalte, setShowHalte] = useState(false);
  const [showHalteTransit, setShowHalteTransit] = useState(false);
  const [showStationTransit, setShowStationTransit] = useState(false);

  const [showWorship, setShowWorship] = useState(false);
  const [showSchool, setShowSchool] = useState(false);
  const [showDining, setShowDining] = useState(false);
  const [showPlaza, setShowPlaza] = useState(false);
  const [showMarket, setShowMarket] = useState(false);

  const coordinates = [
    { latitude: -6.197912, longitude: 106.821562 },
    { latitude: -6.180458, longitude: 106.821106562 },
    { latitude: -6.174212905407266, longitude: 106.80987738332222 },
    { latitude: -6.148498110563283, longitude: 106.82735704635994 },
  ];

  useEffect(() => {
    if (focusIndex === 0) {
      setCoord({
        latitude: -6.197912,
        longitude: 106.821562,
      });
    }
    if (focusIndex === 1) {
      setCoord({
        latitude: -6.180458,
        longitude: 106.821106562,
      });
    }

    if (focusIndex === 2) {
      setCoord({
        latitude: -6.31495364040864,
        longitude: 106.89992421006495,
      });
    }

    if (focusIndex === 3) {
      setCoord({
        latitude: -6.148498110563283,
        longitude: 106.82735704635994,
      });
    }
  }, [focusIndex]);
  const coordArray = [coord.longitude, coord.latitude];

  useEffect(() => {
    const calculateScore = async () => {
      try {
        // const isoChrone15 = await getIsoChrone(coord.longitude,coord.latitude,15,"driving-traffic");
        const isoChrone10 = await getIsoChrone(
          coord.longitude,
          coord.latitude,
          10,
          "driving-traffic"
        );
        const isoChrone10Walking = await getIsoChrone(
          coord.longitude,
          coord.latitude,
          10,
          "walking"
        );

        const isoChrone10Cycling = await getIsoChrone(
          coord.longitude,
          coord.latitude,
          10,
          "cycling"
        );

        setIsoChroneLayerCycling(isoChrone10Cycling);
        setIsoChroneLayerWalking(isoChrone10Walking);

        const MRTData = await getNearbyPlaces(
          coord.longitude,
          coord.latitude,
          MRTTypes,
          5
        );

        const tollData = await getNearbyPlaces(
          coord.longitude,
          coord.latitude,
          tollTypes,
          5
        );

        const HalteData = await getNearbyPlaces(
          coord.longitude,
          coord.latitude,
          halteTypes,
          5
        );

        const trainData = await getNearbyPlaces(
          coord.longitude,
          coord.latitude,
          trainTypes,
          5
        );

        let optionCount = 0;
        let transitCount = 0;

        const MRTValid =
          MRTData.length > 0 &&
          PolygonCheck(
            isoChrone10.features[0].geometry.coordinates[0],
            MRTData
          );

        const tollValid = PolygonCheck(
          isoChrone10.features[0].geometry.coordinates[0],
          tollData
        );
        const halteValid = PolygonCheck(
          isoChrone10.features[0].geometry.coordinates[0],
          HalteData
        );
        const trainValid = PolygonCheck(
          isoChrone10.features[0].geometry.coordinates[0],
          trainData
        );
        const halteTransitValid = PolygonCheck(
          isoChrone10.features[0].geometry.coordinates[0],
          halteTransit
        );
        const stationTransitValid = PolygonCheck(
          isoChrone10.features[0].geometry.coordinates[0],
          stationTransit
        );

        // tier 4 transpotation score
        const halteTransitTrue = halteTransitValid.length > 0;
        const stationTransitTrue = stationTransitValid.length > 0;
        const tollTrue = tollValid.length > 0;

        if (halteTransitTrue) {
          transitCount = transitCount + 1;
        }

        if (stationTransitTrue) {
          transitCount = transitCount + 1;
        }

        if (tollTrue) {
          transitCount = transitCount + 1;
        }

        if (transitCount === 2) {
          if (tollTrue) {
            setScore(86);
          } else {
            setScore(83);
          }
        }

        if (transitCount === 3) {
          setScore(89);
        }

        if (transitCount === 1) {
          setScore(77);
        }

        if (halteValid.length > 0) {
          optionCount + 1;
        }
        if (tollValid.length > 0) {
          optionCount + 1;
        }
        if (trainValid.length > 0) {
          optionCount + 1;
        }

        let tollMin = 0;
        let halteMin = 0;
        let trainMin = 0;

        if (tollValid.length > 0) {
          const tollDirection = getDirection(
            coordArray,
            tollValid[0].center,
            "driving-traffic"
          )
            .then((directionData) => {
              const route = directionData.routes[0];
              const duration = route.duration;
              tollMin = duration;
            })
            .catch((error) => {
              console.error(error);
            });
        }

        if (halteValid.length > 0) {
          const halteDirection = getDirection(
            coordArray,
            halteValid[0].center,
            "driving-traffic"
          )
            .then((directionData) => {
              const route = directionData.routes[0];
              const duration = route.duration;
              halteMin = duration;
            })
            .catch((error) => {
              console.error(error);
            });
        }

        if (trainValid.length > 0) {
          const trainDirection = getDirection(
            coordArray,
            trainValid[0].center,
            "driving-traffic"
          )
            .then((directionData) => {
              const route = directionData.routes[0];
              const duration = route.duration;
              trainMin = duration;
            })
            .catch((error) => {
              console.error(error);
            });
        }

        //mrtroute
        if (MRTValid.length > 0) {
          const MRTDirection = getDirection(
            coordArray,
            MRTValid[0].center,
            "driving-traffic"
          )
            .then((directionData) => {
              const route = directionData.routes[0];
              const duration = route.duration;
              setScore(Math.round(((600 - duration) / 600) * 10) + 90);
              // setRouteData(route);
            })
            .catch((error) => {
              console.error(error);
            });
        }

        setTrainData(trainValid);
        setMRTData(MRTValid);
        setTollData(tollValid);
        setHalteData(halteValid);
        setHalteTransitData(halteTransitValid);
        setStationTransitData(stationTransitValid);
        setIsoChroneLayer(isoChrone10);

        const marketData = await getNearbyPlaces(
          coord.longitude,
          coord.latitude,
          marketTypes,
          5
        );

        const diningData = await getNearbyPlaces(
          coord.longitude,
          coord.latitude,
          diningTypes,
          5
        );

        const schoolData = await getNearbyPlaces(
          coord.longitude,
          coord.latitude,
          schoolTypes,
          5
        );

        const worshipData = await getNearbyPlaces(
          coord.longitude,
          coord.latitude,
          worshipTypes,
          5
        );

        const plazaData = await getNearbyPlaces(
          coord.longitude,
          coord.latitude,
          plazaTypes,
          5
        );

        // Walking
        const defaultIsochrone =
          isoChrone10.features[0].geometry.coordinates[0];

        const marketValidDefault = PolygonCheck(defaultIsochrone, marketData);
        const diningValidDefault = PolygonCheck(defaultIsochrone, diningData);
        const schoolValidDefault = PolygonCheck(defaultIsochrone, schoolData);
        const worshipValidDefault = PolygonCheck(defaultIsochrone, worshipData);
        const plazaValidDefault = PolygonCheck(defaultIsochrone, plazaData);

        setMarketData(marketValidDefault);
        setDiningData(diningValidDefault);
        setSchoolData(schoolValidDefault);
        setWorshipData(worshipValidDefault);
        setPlazaData(plazaValidDefault);

        console.log("worshipValidDefault", worshipValidDefault);

        const marketCountDefault = marketValidDefault.length >= 1 ? 1 : 0;
        const diningCountDefault = diningValidDefault.length >= 1 ? 1 : 0;
        const schoolCountDefault = schoolValidDefault.length >= 1 ? 1 : 0;
        const worshipCountDefault = worshipValidDefault.length >= 1 ? 1 : 0;
        const plazaCountDefault = plazaValidDefault.length >= 1 ? 1 : 0;

        console.log("worshipCountDefault", worshipCountDefault);

        const totalOptionDefault =
          marketCountDefault +
          diningCountDefault +
          schoolCountDefault +
          worshipCountDefault +
          plazaCountDefault;
        console.log("totalOptionDefault", totalOptionDefault);

        const walkingIsochrone =
          isoChrone10Walking.features[0].geometry.coordinates[0];

        const marketValid = PolygonCheck(walkingIsochrone, marketData);
        const diningValid = PolygonCheck(walkingIsochrone, diningData);
        const schoolValid = PolygonCheck(walkingIsochrone, schoolData);
        const worshipValid = PolygonCheck(walkingIsochrone, worshipData);
        const plazaValid = PolygonCheck(walkingIsochrone, plazaData);

        const marketCount = marketValid.length > 0 ? 1 : 0;
        const diningCount = diningValid.length > 0 ? 1 : 0;
        const schoolCount = schoolValid.length > 0 ? 1 : 0;
        const worshipCount = worshipValid.length > 0 ? 1 : 0;
        const plazaCount = plazaValid.length > 0 ? 1 : 0;
        const totalOption =
          marketCount + diningCount + schoolCount + worshipCount + plazaCount;

        const cyclingIsochrone =
          isoChrone10Cycling.features[0].geometry.coordinates[0];

        const marketValidCycling = PolygonCheck(cyclingIsochrone, marketData);
        const diningValidCycling = PolygonCheck(cyclingIsochrone, diningData);
        const schoolValidCycling = PolygonCheck(cyclingIsochrone, schoolData);
        const worshipValidCycling = PolygonCheck(cyclingIsochrone, worshipData);
        const plazaValidCycling = PolygonCheck(cyclingIsochrone, plazaData);
        const marketCountCycling = marketValidCycling.length > 0 ? 1 : 0;
        const diningCountCycling = diningValidCycling.length > 0 ? 1 : 0;
        const schoolCountCycling = schoolValidCycling.length > 0 ? 1 : 0;
        const worshipCountCycling = worshipValidCycling.length > 0 ? 1 : 0;
        const plazaCountCycling = plazaValidCycling.length > 0 ? 1 : 0;
        const totalOptionCycling =
          marketCountCycling +
          diningCountCycling +
          schoolCountCycling +
          worshipCountCycling +
          plazaCountCycling;

        setLocationScore(Math.round(totalOptionDefault * 9.8));
        if (totalOptionDefault > 3 && totalOptionCycling > 0) {
          // Cycling

          // setMarketData(marketValidCycling);
          // setDiningData(diningValidCycling);
          // setSchoolData(schoolValidCycling);
          // setWorshipData(worshipValidCycling);
          // setPlazaData(plazaValidCycling);
          setLocationScore(Math.round(50 + totalOptionCycling * 7.8));

          if (totalOptionCycling > 3 && totalOption > 0) {
            // Default (Walking with fallback to Cycling)

            //walking

            // setMarketData(marketValid);
            // setDiningData(diningValid);
            // setSchoolData(schoolValid);
            // setWorshipData(worshipValid);
            // setPlazaData(plazaValid);
            setLocationScore(Math.round(totalOption * 2 + 90));
          }
        }
      } catch (error) {
        console.error("Error calculating score:", error);
      }
    };

    calculateScore();
  }, [coord]);

  const showAll = () => {
    setShowPolygon(true);
    setShowTrain(true);
    setShowMRT(true);
    setShowToll(true);
    setShowHalte(true);
    setShowHalteTransit(true);
    setShowStationTransit(true);
    setShowDining(true);
    setShowWorship(true);
    setShowSchool(true);
    setShowPlaza(true);
    setShowMarket(true);
  };

  const hideAll = () => {
    setShowPolygon(false);
    setShowTrain(false);
    setShowMRT(false);
    setShowToll(false);
    setShowHalte(false);
    setShowHalteTransit(false);
    setShowStationTransit(false);
    setShowDining(false);
    setShowWorship(false);
    setShowSchool(false);
    setShowPlaza(false);
    setShowMarket(false);
  };

  const toggleShowHalte = () => {
    setShowHalte(!showHalte);
  };

  const [showCoordinates, setShowCoordinates] = useState(false);

  const handleShowCoordinates = () => {
    setShowCoordinates(!showCoordinates);
  };

  const routeLayer = (center) => {
    const trainDirection = getDirection(coordArray, center, "driving-traffic")
      .then((directionData) => {})
      .catch((error) => {
        console.error(error);
      });
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);

  const handleSearch = () => {
    // Perform search logic here
    console.log("Search term:", searchTerm);
  };

  const handleFilterToggle = () => {
    setFilterOpen(!filterOpen);
  };

  const [isoChroneIndex, setIsoChroneIndex] = useState(0);

  return (
    <main className=" mx-auto pt-4  ">
      <header className="bg-[var(--bg-primary)] ">
        <nav className="flex items-center justify-between p-4">
          <div className="flex  gap-3 text-[var(--primary2)]">
            <h1>Beli</h1>
            <h1>Sewa</h1>
            <h1>Jual</h1>
          </div>
          <div className="text-2xl text-white">
            <h1>Graha Space</h1>
          </div>
          <div className="flex gap-5 text-[var(--primary2)]">
            <h1>Bantuan</h1>
            <h1>Masuk</h1>
            <h1>Home</h1>
          </div>
        </nav>
      </header>
      <Sidebar>
        <div className="border-cool-gray-200 flex w-full items-center  justify-center  rounded-b-3xl border-b bg-white p-2 shadow-lg">
          <input
            type="text"
            placeholder={`Search...`}
            className="rounded-md border border-gray-300 px-2 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="ml-2 rounded-md bg-[var(--primary2)] px-2 py-2 text-white focus:outline-none"
            onClick={handleSearch}
          >
            Search
          </button>
          <button
            className="ml-2 rounded-md bg-[var(--primary2)] px-2 py-2 text-white focus:outline-none"
            onClick={handleFilterToggle}
          >
            {filterOpen ? "Filter" : "Filter"}
          </button>
          {filterOpen && (
            <div className="absolute right-0 top-10 rounded-md border border-gray-300 bg-white p-4">
              {/* Filter options */}
            </div>
          )}
        </div>
        <div className="flex  w-full flex-col items-start  p-5 text-lg font-semibold">
          <h1>Properti dan Rumah Dijual</h1>
        </div>
        <Card
          setIndex={setFocusIndex}
          number={0}
          handleShow={showAll}
          transportationScore={score}
          handleShowHalte={() => toggleShowHalte()}
          handleShowToll={() => setShowToll(!showToll)}
          handleShowTrain={() => setShowTrain(!showTrain)}
          handleShowMRT={() => setShowMRT(!showMRT)}
          showHalte={showHalte}
          showToll={showToll}
          showTrain={showTrain}
          showMRT={showMRT}
          handleHide={hideAll}
          handleShowCoordinates={handleShowCoordinates}
          focusIndex={focusIndex}
          locationScore={locationScore}
          MarketPoints={marketData}
          DiningPoints={diningData}
          SchoolPoints={schoolData}
          WorshipPoints={worshipData}
          PlazaPoints={plazaData}
          showWorship={showWorship}
          showSchool={showSchool}
          showDining={showDining}
          showPlaza={showPlaza}
          showMarket={showMarket}
          handleShowDining={() => setShowDining(!showDining)}
          handleShowWorship={() => setShowWorship(!showWorship)}
          handleShowSchool={() => setShowSchool(!showSchool)}
          handleShowPlaza={() => setShowPlaza(!showPlaza)}
          handleShowMarket={() => setShowMarket(!showMarket)}
        />
        <Card
          setIndex={setFocusIndex}
          number={1}
          handleShow={showAll}
          transportationScore={score}
          handleShowHalte={() => toggleShowHalte()}
          handleShowToll={() => setShowToll(!showToll)}
          handleShowTrain={() => setShowTrain(!showTrain)}
          handleShowMRT={() => setShowMRT(!showMRT)}
          showHalte={showHalte}
          showToll={showToll}
          showTrain={showTrain}
          showMRT={showMRT}
          handleHide={hideAll}
          handleShowCoordinates={handleShowCoordinates}
          focusIndex={focusIndex}
          locationScore={locationScore}
          MarketPoints={marketData}
          DiningPoints={diningData}
          SchoolPoints={schoolData}
          WorshipPoints={worshipData}
          PlazaPoints={plazaData}
          showWorship={showWorship}
          showSchool={showSchool}
          showDining={showDining}
          showPlaza={showPlaza}
          showMarket={showMarket}
          handleShowDining={() => setShowDining(!showDining)}
          handleShowWorship={() => setShowWorship(!showWorship)}
          handleShowSchool={() => setShowSchool(!showSchool)}
          handleShowPlaza={() => setShowPlaza(!showPlaza)}
          handleShowMarket={() => setShowMarket(!showMarket)}
        />
        <Card
          setIndex={setFocusIndex}
          number={2}
          handleShow={showAll}
          transportationScore={score}
          handleShowHalte={() => toggleShowHalte()}
          handleShowToll={() => setShowToll(!showToll)}
          handleShowTrain={() => setShowTrain(!showTrain)}
          handleShowMRT={() => setShowMRT(!showMRT)}
          showHalte={showHalte}
          showToll={showToll}
          showTrain={showTrain}
          showMRT={showMRT}
          handleHide={hideAll}
          handleShowCoordinates={handleShowCoordinates}
          focusIndex={focusIndex}
          locationScore={locationScore}
          MarketPoints={marketData}
          DiningPoints={diningData}
          SchoolPoints={schoolData}
          WorshipPoints={worshipData}
          PlazaPoints={plazaData}
          showWorship={showWorship}
          showSchool={showSchool}
          showDining={showDining}
          showPlaza={showPlaza}
          showMarket={showMarket}
          handleShowDining={() => setShowDining(!showDining)}
          handleShowWorship={() => setShowWorship(!showWorship)}
          handleShowSchool={() => setShowSchool(!showSchool)}
          handleShowPlaza={() => setShowPlaza(!showPlaza)}
          handleShowMarket={() => setShowMarket(!showMarket)}
        />
        <Card
          setIndex={setFocusIndex}
          number={3}
          handleShow={showAll}
          transportationScore={score}
          handleShowHalte={() => toggleShowHalte()}
          handleShowToll={() => setShowToll(!showToll)}
          handleShowTrain={() => setShowTrain(!showTrain)}
          handleShowMRT={() => setShowMRT(!showMRT)}
          showHalte={showHalte}
          showToll={showToll}
          showTrain={showTrain}
          showMRT={showMRT}
          handleHide={hideAll}
          handleShowCoordinates={handleShowCoordinates}
          focusIndex={focusIndex}
          locationScore={locationScore}
          MarketPoints={marketData}
          DiningPoints={diningData}
          SchoolPoints={schoolData}
          WorshipPoints={worshipData}
          PlazaPoints={plazaData}
          showWorship={showWorship}
          showSchool={showSchool}
          showDining={showDining}
          showPlaza={showPlaza}
          showMarket={showMarket}
          handleShowDining={() => setShowDining(!showDining)}
          handleShowWorship={() => setShowWorship(!showWorship)}
          handleShowSchool={() => setShowSchool(!showSchool)}
          handleShowPlaza={() => setShowPlaza(!showPlaza)}
          handleShowMarket={() => setShowMarket(!showMarket)}
        />
      </Sidebar>
      <MapScreen
        coord={coord}
        setCoord={setCoord}
        markerArray={marketData}
        polygon={
          isoChroneIndex === 0
            ? isoChroneLayer
            : isoChroneIndex === 1
            ? isoChroneLayerCycling
            : isoChroneLayerWalking
        }
        MRTPoints={MRTData}
        trainPoints={trainData}
        haltePoints={halteData}
        tollPoints={tollData}
        halteTransitPoints={halteTransitData}
        stationTransitPoints={stationTransitData}
        showHaltetTransit={showHalteTransit}
        showStationTransit={showStationTransit}
        showToll={showToll}
        showHalte={showHalte}
        showTrain={showTrain}
        showMRT={showMRT}
        showPolygon={showPolygon}
        coordinates={coordinates}
        showCoordinates={showCoordinates}
        marketPoints={marketData}
        diningPoints={diningData}
        schoolPoints={schoolData}
        worshipPoints={worshipData}
        plazaPoints={plazaData}
        showWorship={showWorship}
        showSchool={showSchool}
        showDining={showDining}
        showPlaza={showPlaza}
        showMarket={showMarket}
      />
      {!showCoordinates && (
        <div className="fixed flex justify-between p-10 top-24 ml-96  w-80 h-24 bg-white shadow p-4 ">
          <div
            className={`flex justify-center  max-h-16 p-3 ${
              isoChroneIndex === 0 ? "bg-[#1F363D]" : "bg-slate-500"
            } text-white`}
            onClick={() => setIsoChroneIndex(0)}
          >
            Driving
          </div>
          <div
            className={`flex justify-center  p-3 ${
              isoChroneIndex === 1 ? "bg-[#1F363D]" : "bg-slate-500"
            } text-white`}
            onClick={() => setIsoChroneIndex(1)}
          >
            Cycling
          </div>
          <div
            className={`flex justify-center  p-3 ${
              isoChroneIndex === 2 ? "bg-[#1F363D]" : "bg-slate-500"
            } text-white`}
            onClick={() => setIsoChroneIndex(2)}
          >
            Walking
          </div>
        </div>
      )}
      {/* {!showCoordinates && (
        <div className="fixed top-24 right-14 h-1/2 w-80 bg-white shadow p-4 overflow-y-scroll">
          <h2 className="text-lg font-semibold mb-2">List of Places</h2>

          <h3 className="text-base font-semibold mb-2 mt-5">Stasiun</h3>
          {trainData?.map((data, index) => (
            <div className="bg-gray-50 shadow-md p-4 rounded-md mt-3">
              <h3 className="text-base font-semibold mb-2">{data.text}</h3>
              <p className="text-gray-600">{data.place_name}</p>
            </div>
          ))}

          <h3 className="text-base font-semibold mb-2 mt-5">MRT</h3>
          {MRTData?.map((data, index) => (
            <div className="bg-gray-50 shadow-md p-4 rounded-md mt-3">
              <h3 className="text-base font-semibold mb-2">{data.text}</h3>
              <p className="text-gray-600">{data.place_name}</p>
            </div>
          ))}

          <h3 className="text-base font-semibold mb-2 mt-5">Halte</h3>
          {halteData?.map((data, index) => (
            <div className="bg-gray-50 shadow-md p-4 rounded-md mt-3">
              <h3 className="text-base font-semibold mb-2">{data.text}</h3>
              <p className="text-gray-600">{data.place_name}</p>
            </div>
          ))}

          <h3 className="text-base font-semibold mb-2 mt-5">Toll</h3>
          {tollData?.map((data, index) => (
            <div className="bg-gray-50 shadow-md p-4 rounded-md mt-3">
              <h3 className="text-base font-semibold mb-2">{data.text}</h3>
              <p className="text-gray-600">{data.place_name}</p>
            </div>
          ))}
        </div>
      )} */}

      {!showCoordinates && (
        <div className="fixed top-96 right-14 h-1/2 w-80 bg-white shadow p-4 overflow-y-scroll">
          <h2 className="text-lg font-semibold mb-2">List of Places</h2>

          <h3 className="text-base font-semibold mb-2 mt-5">Mini Market</h3>
          {marketData?.map((data, index) => (
            <div className="bg-gray-50 shadow-md p-4 rounded-md mt-3">
              <h3 className="text-base font-semibold mb-2">{data.text}</h3>
              <p className="text-gray-600">{data.place_name}</p>
            </div>
          ))}

          <h3 className="text-base font-semibold mb-2 mt-5">Dining</h3>
          {diningData?.map((data, index) => (
            <div className="bg-gray-50 shadow-md p-4 rounded-md mt-3">
              <h3 className="text-base font-semibold mb-2">{data.text}</h3>
              <p className="text-gray-600">{data.place_name}</p>
            </div>
          ))}

          <h3 className="text-base font-semibold mb-2 mt-5">Worship</h3>
          {worshipData?.map((data, index) => (
            <div className="bg-gray-50 shadow-md p-4 rounded-md mt-3">
              <h3 className="text-base font-semibold mb-2">{data.text}</h3>
              <p className="text-gray-600">{data.place_name}</p>
            </div>
          ))}

          <h3 className="text-base font-semibold mb-2 mt-5">School</h3>
          {schoolData?.map((data, index) => (
            <div className="bg-gray-50 shadow-md p-4 rounded-md mt-3">
              <h3 className="text-base font-semibold mb-2">{data.text}</h3>
              <p className="text-gray-600">{data.place_name}</p>
            </div>
          ))}

          <h3 className="text-base font-semibold mb-2 mt-5">Plaza</h3>
          {plazaData?.map((data, index) => (
            <div className="bg-gray-50 shadow-md p-4 rounded-md mt-3">
              <h3 className="text-base font-semibold mb-2">{data.text}</h3>
              <p className="text-gray-600">{data.place_name}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
