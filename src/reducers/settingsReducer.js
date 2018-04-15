import * as types from "../actions/actionTypes";

const initialState = {
  data: {},
  error: false,
  loading: false
};

const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_SETTINGS:
      return Object.assign({}, state, {
        data : action.data,
        error: false,
        loading : false
      });
    default:
      return state;
  }
}

export default settingsReducer;