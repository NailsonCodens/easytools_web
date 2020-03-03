import api from '../services/api';
const token = process.env.REACT_APP_TOKEN_MAPBOX;

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
  navigator.geolocation.getCurrentPosition(function(position) {
    return position
  });

}

