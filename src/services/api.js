import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:9090/api/',
  responseType: 'json',
});

export default api;