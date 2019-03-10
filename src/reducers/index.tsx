import { combineReducers } from "redux";
import auth from "./auth";
import playlist from "./playlist";
import results from "./results";
import windows from "./windows";

const reducer = combineReducers({
  auth,
  windows,
  playlist,
  results,
});
export default reducer;
