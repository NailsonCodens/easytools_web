import store from '../store/index';
import axios from 'axios';
import SimpleCrypto from "simple-crypto-js";
import socketio from '../services/socketio';

var _secretKey = 'KY_TP=*r9lX&ExT9X+(0%';
var simpleCrypto = new SimpleCrypto(_secretKey);
 
export const TOKEN_KEY = "@tk-e";
export const TYPEUSER_KEY = "@t-us";
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
  store.dispatch({type:"auth", email: null, name: null, type_user: null, token: null})
};

const api = axios.create({
  baseURL: 'http://localhost:9090/api/',
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
    }) 
  })   
}