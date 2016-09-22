import { combineReducers } from 'redux'
import auth from './auth'
import windows from './windows'
import playlist from './playlist'

const balistosApp = combineReducers({
  auth,
  windows,
  playlist
})
export default balistosApp;
