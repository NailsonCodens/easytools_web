import { combineReducers } from 'redux';
import auth from './auth';
import picture from './picture';

export default combineReducers({
  auth,
  picture
});