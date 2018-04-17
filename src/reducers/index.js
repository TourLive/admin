import { combineReducers } from "redux";
import settingsReducer from "./settingsReducer";
import racesReducer from "./racesReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  settings : settingsReducer,
  races : racesReducer,
  user : userReducer
});

export default rootReducer;