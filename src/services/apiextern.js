import axios from 'axios';

const apiextern = axios.create({
  baseURL: 'http://localhost:9090/api/',
  responseType: 'json',
});

export default apiextern;