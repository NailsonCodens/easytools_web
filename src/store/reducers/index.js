import { combineReducers } from 'redux';
import auth from './auth';
import picture from './picture';
import search from './search';
import rentinfo from './rentinfo';
import rentaltool from './rentaltool'
import rentattempt from './rentattempt'
import notification from './notification';
import coordinates from './coordinates';
import link from './link';

export default combineReducers({
  auth,
  picture,
  search,
  rentinfo,
  rentaltool,
  rentattempt,
  notification,
  coordinates,
  link
});