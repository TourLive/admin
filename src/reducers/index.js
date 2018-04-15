import { combineReducers } from "redux";
import settingsReducer from "./settingsReducer";
import racesReducer from "./racesReducer";

const rootReducer = combineReducers({
  settings : settingsReducer,
  races : racesReducer
});

export default rootReducer;