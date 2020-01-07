import { combineReducers } from 'redux';
import auth from './auth';
import picture from './picture';
import search from './search';

export default combineReducers({
  auth,
  picture,
  search
});