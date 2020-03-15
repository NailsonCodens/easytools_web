import axios from 'axios';
import { getToken } from "./auth";

let baseURL = process.env.REACT_APP_URL_DEV;

if (process.env.NODE_ENV === 'production') {
  baseURL = process.env.REACT_APP_URL_BUILD;
}


const api = axios.create({
  baseURL: baseURL,
  responseType: 'json',
});

api.interceptors.request.use(async config => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;