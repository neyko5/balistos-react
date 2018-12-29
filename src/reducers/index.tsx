import { combineReducers } from 'redux';
import auth from './auth';
import windows from './windows';
import playlist from './playlist';
import results from './results';

const reducer = combineReducers({
  auth,
  windows,
  playlist,
  results,
});
export default reducer;
