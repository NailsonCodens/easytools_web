import { combineReducers } from 'redux';
import auth from './auth';
import picture from './picture';
import search from './search';
import rentinfo from './rentinfo';
import rentaltool from './rentaltool'
import rentattempt from './rentattempt'
import notification from './notification';
import latitude from './latitude';
import longitude from './longitude';
import distance from './distance';
import notifications from './notifications';
import link from './link';
import document from './document';
import proof from './proof';
import selfie from './selfie';
import social from './social';
import viewsearch from './viewsearch';

export default combineReducers({
  auth,
  picture,
  search,
  rentinfo,
  rentaltool,
  rentattempt,
  notification,
  latitude,
  longitude,
  distance,
  link,
  document,
  proof,
  selfie,
  social,
  viewsearch,
  notifications
});