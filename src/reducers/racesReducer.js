import * as types from "../actions/actionTypes";

const initialState = {
  data: [],
  error: false,
  loading: false
};

const racesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_RACES_AND_STAGES:
      console.log("RACESREDUCER");
      console.log(action.data);
      return Object.assign({}, state, {
        data : action.data,
        error: false,
        loading : false
      });
    default:
      return state;
  }
}

export default racesReducer;