import axios from "axios";

//Use if decide to have a find location button

// export async function findGeoUserLocation() {
//   const promise = new Promise((resolve, reject) => {
//     navigator.geolocation.getCurrentPosition(
//       async (location) => {
//         const result = await getLocationFromCoords(
//           location.coords.latitude,
//           location.coords.longitude
//         );

//         resolve(result);
//       },
//       (error) => {
//         reject("Geolocation API didnt work");
//         console.log(error);
//       }
//     );
//   });

//   return await promise;
// }

export async function findLonAndLat(postcode) {
  try {
    const location = await axios.get(
      `https://api.postcodes.io/postcodes/${postcode}`
    );
    return location.data.result;
  } catch (error) {
    console.log(error);
  }
}
