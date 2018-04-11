import { combineReducers } from "redux";
import riderReducer from "./riderReducer";

const rootReducer = combineReducers({
    riders: riderReducer
});

export default rootReducer;