// import mbxGeocoding from "@mapbox/mapbox-sdk/services/geocoding";
// import process from "process";
// const MAPBOX_API_KEY = process.env.NEXT_PUBLIC_MAPBOX_API_KEY;

// export const geocodingClient = mbxGeocoding({ accessToken: MAPBOX_API_KEY });

// const fetchData = useCallback(
//   () =>
//     geocodingClient
//       .forwardGeocode({
//         query: "Ikeja, Lagos",
//         countries: ["ng"],
//         limit: 2,
//       })
//       .send()
//       .then((response) => {
//         const match = response.body;
//         const coordinates = match.features[0].geometry.coordinates;
//         const placeName = match.features[0].place_name;
//         const center = match.features[0].center;

//         return match;
//       }),
//   []
// );
