import axios from 'axios';

let baseURL = process.env.REACT_APP_URL_DEV;

if (process.env.NODE_ENV === 'production') {
  baseURL = process.env.REACT_APP_URL_BUILD;
}

const apiextern = axios.create({
  baseURL: baseURL,
  responseType: 'json',
});

export default apiextern;