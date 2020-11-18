import store from '../store/index';
import axios from 'axios';
import simpleCrypto from './crypto';

export const TOKEN_KEY = process.env.REACT_APP_TOKEN_KEY;
export const TYPEUSER_KEY = process.env.REACT_APP_TYPEUSER_KEY;
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getLoggedLessor = () => simpleCrypto.decrypt(localStorage.getItem(TYPEUSER_KEY));
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const login = (token, type) => {
  localStorage.setItem(TOKEN_KEY, token);
  var crypt = simpleCrypto.encrypt(type);
  localStorage.setItem(TYPEUSER_KEY, crypt);
};
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(TYPEUSER_KEY);

  store.dispatch({type:"auth", email: null, name: null, type_user: null, token: null})
};

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

if (localStorage.getItem(TOKEN_KEY) !== null) {
  api.get('/perfil/').then((res) => {
    res.data.user.map(function(user) {
      store.dispatch({type:"auth", id: user.id, email: user.email, name: user.name, type_user: user.type, token: getToken()})
      return '';
    }) 
  })   
}