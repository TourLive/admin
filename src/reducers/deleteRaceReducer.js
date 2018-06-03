import * as types from "../actions/actionTypes";

const initialState = {
  loading : false,
  error: "",
};

const deleteRaceReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_DELETE_RACE_DONE:
      return {...state, loading: false};
    case types.SET_DELETE_RACE_START:
      return {...state, loading: true, error : ""};
    case types.SET_DELETE_RACE_ERROR:
      return {...state, loading: false, error : action.data};
    default:
      return state;
  }
}

export default deleteRaceReducer;