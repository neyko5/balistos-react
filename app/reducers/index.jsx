import { combineReducers } from 'redux'
import auth from './auth'
import windows from './windows'

const balistosApp = combineReducers({
  auth,
  windows
})
export default balistosApp;