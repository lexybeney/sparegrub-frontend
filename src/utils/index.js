import axios from "axios";

export function generateRandomId(length = 30) {
  const now = Date.now().toString();
  let uniqueId = "";
  const chars =
    "ABCDEFGHIJUKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz";
  const charsLength = chars.length;

  for (let index = 0; index < length - now.length; index++) {
    uniqueId += chars.charAt(Math.floor(Math.random() * charsLength));
  }
  return uniqueId + Date.now();
}

export const findIndexUsingId = (listToSearch, id) => {
  return listToSearch.findIndex((item) => item.item_id === id);
};

export const calcDistance = (lat1, lon1, lat2, lon2, unit) => {
  if (lat1 === lat2 && lon1 === lon2) {
    return 0;
  } else {
    var radlat1 = (Math.PI * lat1) / 180;
    var radlat2 = (Math.PI * lat2) / 180;
    var theta = lon1 - lon2;
    var radtheta = (Math.PI * theta) / 180;
    var dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit === "K") {
      dist = dist * 1.609344;
    }
    if (unit === "N") {
      dist = dist * 0.8684;
    }
    return dist;
  }
};

export const findLatAndLon = async (postcode) => {
  try {
    // const results = await axios.get(
    //   `http://api.positionstack.com/v1/forward?access_key=2b71f4d5c4e44e3b7d455467aacba7a7&query=${postcode}`
    // );

    const results = await axios.get(
      `http://dev.virtualearth.net/REST/v1/Locations/UK/${postcode}?key=Aozv8IU_eRVxGoscu2i0AlPSvN-vLi7im52btW0S5w_FQ3lobXoZQgDh1m_TSpbq`
    );

    const location = {
      latitude:
        results.data.resourceSets[0].resources[0].geocodePoints[0]
          .coordinates[0],
      longitude:
        results.data.resourceSets[0].resources[0].geocodePoints[0]
          .coordinates[1],
    };
    return location;
  } catch (error) {
    console.log(error);
    const location = { latitude: null, longitude: null };
    return location;
  }
};
