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
import photo1 from './photo1';
import photo2 from './photo2';
import photo3 from './photo3';
import rentclient from './rentclient';
import refreshui from './refreshui';
import adons from './adons';

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
  notifications,
  photo1,
  photo2,
  photo3,
  rentclient,
  refreshui,
  adons
});