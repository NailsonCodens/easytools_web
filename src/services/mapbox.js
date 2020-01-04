import api from '../services/api';
const token = "pk.eyJ1IjoibmFpbHNvbiIsImEiOiJjazRrYmRyMnUwNHdoM2RvanpkM2t3Z2ZkIn0.8KBTYMBwH5sb0OIhnk5icg";

export const getCordinates = (query) => {
  const response = api.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${token}`, {
  });
  return response
}

export const getAddress = (longitude, latitude) => {
  const response = api.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${token}`, {
  });
  return response
}

export const getGeolocalization = () => {
  const geo = navigator.geolocation.getCurrentPosition(function(position) {
    return position
  });

}

