import { combineReducers } from 'redux'
import auth from './auth'
import windows from './windows'
import chat from './chat'
import playlist from './playlist'

const balistosApp = combineReducers({
  auth,
  windows,
  chat,
  playlist
})
export default balistosApp;