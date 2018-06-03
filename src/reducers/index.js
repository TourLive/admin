import { combineReducers } from "redux";
import settingsReducer from "./settingsReducer";
import racesReducer from "./racesReducer";
import userReducer from "./userReducer";
import importReducer from "./importReducer";
import importTimingReducer from "./importTimingReducer";
import importGPXReducer from "./importGPXReducer";
import statusReducer from "./statusReducer";
import cnlabReducer from "./cnlabReducer";
import deleteRaceReducer from './deleteRaceReducer'

const rootReducer = combineReducers({
  settings : settingsReducer,
  races : racesReducer,
  user : userReducer,
  import : importReducer,
  importGPX : importGPXReducer,
  importTiming : importTimingReducer,
  status : statusReducer,
  cnlab : cnlabReducer,
  delete : deleteRaceReducer
});

export default rootReducer;