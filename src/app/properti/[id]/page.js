"use client"
import React,{ useEffect, useState } from "react";
import Image from "next/image";
import Calculator from "../../component/Calculator";
import MapScreen from "@/app/component/Map";
import boundaryBox from "../../helper/boundaryBox";
import {
  isoChrone,stationTransit,halteTransit 
} from "@/app/constant";
import PolygonCheck from "@/app/helper/pointsCheck";
const MAPBOX_API_KEY = process.env.NEXT_PUBLIC_MAPBOX_API_KEY;

function convertCoordinatesToFormat(response) {
  const coordinatesArray = response.features[0].geometry.coordinates;
  const formattedCoordinates = coordinatesArray.flatMap(pair => pair.map(coord => `${coord[0]}%2C${coord[1]}`));
  const formattedString = formattedCoordinates.join('%2C');

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

const getIsoChrone = async (longitude, latitude, minutes,type) => {
  const API_KEY = MAPBOX_API_KEY;
  const baseUrl = "https://api.mapbox.com/isochrone/v1/mapbox";
  const endpoint = `${baseUrl}/${type}/${longitude}%2C${latitude}?contours_minutes=${minutes}&generalize=100&polygons=true&denoise=1&access_token=${API_KEY}`;
  const response = await fetch(endpoint);

  const data = await response.json();
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return data;
}

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
  }
  catch (error) {
   
    throw new Error("An error occurred while processing API data");
    
  }
};




const bbox = convertCoordinatesToFormat(isoChrone);

export default function Page({ params }) {

  const [score, setScore] = useState(0); 
  const [marketData, setMarketData] = useState([]);
  const [coord , setCoord] = useState({ latitude: -6.29994, longitude:  106.921309 }); 
  const marketTypes = ["alfamart"];
  const busTypes = ["bus station"];
  const MRTTypes = ["stasiun mrt"];
  const tollTypes = ["toll booth"];
  const diningTypes = ["restaurant"];
  const schoolTypes = ["school"];
  const worshipTypes = ["place of worship"];
  const halteTypes = ["halte"];
  const trainTypes = ["stasiun"];
  const[isoChroneLayer,setIsoChroneLayer] = useState(null);
  const [trainData, setTrainData] = useState([]);
  const [routeData, setRouteData] = useState(null);
  const [tollData, setTollData] = useState([]);
  const [halteData, setHalteData] = useState([]);
  const [MRTData, setMRTData] = useState([]);
  const [stationTransitData, setStationTransitData] = useState([]);
  const [halteTransitData, setHalteTransitData] = useState([]);
  
 
  useEffect(() => {
    const calculateScore = async () => {
      try {
       
        // const isoChrone15 = await getIsoChrone(coord.longitude,coord.latitude,15,"driving-traffic");
        const isoChrone10 = await getIsoChrone(coord.longitude,coord.latitude,10,"driving-traffic");
        const coordArray = [coord.longitude,coord.latitude]
        // const isoChroneWalking = await getIsoChrone(coord.longitude,coord.latitude,15,"walking");
        // const isoChroneCycling = await getIsoChrone(coord.longitude,coord.latitude,15,"cycling");


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


        const MRTValid = MRTData.length > 0 && PolygonCheck(isoChrone10.features[0].geometry.coordinates[0],MRTData )
        
        const tollValid = PolygonCheck(isoChrone10.features[0].geometry.coordinates[0],tollData )
        const halteValid = PolygonCheck(isoChrone10.features[0].geometry.coordinates[0],HalteData )
        const trainValid = PolygonCheck(isoChrone10.features[0].geometry.coordinates[0],trainData )
        const halteTransitValid = PolygonCheck(isoChrone10.features[0].geometry.coordinates[0],halteTransit )
        const stationTransitValid = PolygonCheck(isoChrone10.features[0].geometry.coordinates[0],stationTransit )


        // tier 4 transpotation score
        const halteTransitTrue = halteTransitValid.length > 0;
        const stationTransitTrue = stationTransitValid.length > 0;
        const tollTrue = tollValid.length > 0;

        

        if (halteTransitTrue){
          transitCount= transitCount + 1
        }

        if (stationTransitTrue){
          transitCount= transitCount + 1
        }

        if (tollTrue){
          transitCount= transitCount + 1
        }

       

        if(transitCount === 2 ){
          if(tollTrue){
            setScore(86)
          }
          else{
            setScore(83)
          }
        }

        if(transitCount === 3 ){
          setScore(89)
        }

        if(transitCount === 1 ){
          setScore(77)
        }
        
        if (halteValid.length > 0) {
          optionCount+1
        }
        if (tollValid.length > 0) {
          optionCount+1
        }
        if (trainValid.length > 0) {
          optionCount+1
        }

        


        let countScore = 0;
        let tollMin = 0;
        let halteMin = 0;
        let trainMin = 0;

      


        if (tollValid.length > 0) {
          const tollDirection = getDirection(coordArray,tollValid[0].center,"driving-traffic").then(directionData => {
            const route = directionData.routes[0];
            const duration = route.duration;
            tollMin = duration;
          }).catch(error => {
            console.error(error);
          }
          );

        }

        if(halteValid.length > 0) {
          const halteDirection = getDirection(coordArray,halteValid[0].center,"driving-traffic").then(directionData => {
            const route = directionData.routes[0];
            const duration = route.duration;
            halteMin = duration;
          }
          ).catch(error => {
            console.error(error);
          }
          );
        }

        if(trainValid.length > 0) {
          const trainDirection = getDirection(coordArray,trainValid[0].center,"driving-traffic").then(directionData => {
            const route = directionData.routes[0];
            const duration = route.duration;
            trainMin = duration;

          }
          ).catch(error => {
            console.error(error);
          }
          );
        }
          

        //mrtroute
        if (MRTValid.length > 0) {
          const MRTDirection = getDirection(coordArray,MRTValid[0].center,"driving-traffic").then(directionData => {
            const route = directionData.routes[0];
            const duration = route.duration;
            setScore(Math.round(((600-duration)/600)*10)+90)
            setRouteData(route)
          })
            .catch(error => {
              console.error(error);
            });
          console.log("MRTDirection",MRTDirection)
        }
        


        setTrainData(trainValid)
        setMRTData(MRTValid)
        setTollData(tollValid)
        setHalteData(halteValid)
        setHalteTransitData(halteTransitValid)
        setStationTransitData(stationTransitValid)
        setIsoChroneLayer(isoChrone10)

      }
      catch (error) {
        console.error("Error calculating score:", error);
      }
    };

    calculateScore();
  }, [coord]);


  



  return (
    <main className=" mx-auto py-12 ">
      <div className="relative bg-gray-900  w-full  mt-4">
        <Image
          src={`/${params.id}.jpg`}
          alt="hero image"
          loading="lazy"
          width={1920}
          height={1080}
          style={{
            objectFit: "cover",
            width: "100%",
            minHeight: "100%",
            height: "600px",
          }}
        />
        <div className="absolute   inset-0 bg-black bg-opacity-50">
          <h1 className="text-6xl mt-20 text-white font-semibold text-center pt-20">
            {params.id}
          </h1>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-md p-8  w-2/3 mx-auto absolute-container -mt-32 ">
        <h2 className="text-2xl font-semibold mb-4">Property Information</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold mb-2">Address</h3>
            <p className="text-gray-700">1234 Elm Street, City, State</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Price</h3>
            <p className="text-gray-700">$2,500/month</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Bedrooms</h3>
            <p className="text-gray-700">3</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Bathrooms</h3>
            <p className="text-gray-700">2</p>
          </div>
        </div>
        <p className="text-gray-700 mt-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
          efficitur gravida orci, sit amet maximus nibh elementum ut. Proin ut
          quam id orci maximus fringilla. Donec vehicula luctus ligula, non
          vulputate nulla. Nam nec semper tortor. Aliquam ac eleifend justo, id
          convallis leo. Sed consequat consectetur dolor sed hendrerit. Nulla eu
          purus eu urna ullamcorper iaculis. Mauris at pretium dolor, vitae
          tempor lacus.
        </p>
      </div>
      <div className="bg-white rounded-lg shadow-md p-8 flex  w-2/3 mx-auto mt-64 px-20 gap-4">
        {/* <iframe
          src="https://www.google.com/maps/d/u/0/embed?mid=1SQn2DlLSLLhichXo1RGfh50IAlTKjlY&ehbc=2E312F"
          width={600}
          height={400}
          className="rounded-lg"
        ></iframe>
        <div className="my-auto">
          <h1 className="text-2xl font-bold mb-2">Rumah Sakit</h1>
          <h1 className="text-2xl font-bold mb-2">Rumah Makan</h1>
          <h1 className="text-2xl font-bold mb-2">Rumah Hiburan</h1>
          <h1 className="text-2xl font-bold mb-2">Sasana Boxing</h1>
        </div> */}

        <MapScreen coord={coord} setCoord={setCoord} markerArray={marketData} polygon={isoChroneLayer} MRTPoints={MRTData} trainPoints={trainData} haltePoints={halteData} tollPoints={tollData} halteTransitPoints={halteTransitData} stationTransitPoints={stationTransitData}/>
        <h2>Scoring: {score}</h2>


      </div>
      <div className="bg-white rounded-lg shadow-md p-8 flex  w-2/3 mx-auto mt-8 px-20 gap-4">
        <Calculator />
      </div>
      <div className="bg-white rounded-lg shadow-md p-8 flex items-center justify-center  w-2/3 mx-auto mt-8 px-20 gap-4">
        <iframe
          width="800"
          height="500"
          allowFullScreen
          src="https://cdn.pannellum.org/2.5/pannellum.htm#panorama=https://pannellum.org/images/alma.jpg"
        ></iframe>
      </div>
    </main>
  );
}
