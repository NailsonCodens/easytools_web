import { combineReducers } from 'redux';
import auth from './auth';
import picture from './picture';
import search from './search';
import rentinfo from './rentinfo';
import rentaltool from './rentaltool'

export default combineReducers({
  auth,
  picture,
  search,
  rentinfo,
  rentaltool
});