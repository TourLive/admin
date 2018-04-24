import { combineReducers } from "redux";
import settingsReducer from "./settingsReducer";
import racesReducer from "./racesReducer";
import userReducer from "./userReducer";
import importReducer from "./importReducer";

const rootReducer = combineReducers({
  settings : settingsReducer,
  races : racesReducer,
  user : userReducer,
  import : importReducer
});

export default rootReducer;