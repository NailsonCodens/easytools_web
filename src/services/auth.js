import store from '../store/index';
import axios from 'axios';

export const TOKEN_KEY = "@easytoolsweb-Token";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const login = token => {

  localStorage.setItem(TOKEN_KEY, token);
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
    res.data.user.map(user => (
      store.dispatch({type:"auth", email: user.email, name: user.name, type_user: user.type, token: getToken()})
    )) 
  })   
}else {
  console.log('não logado')
}