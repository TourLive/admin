import * as types from "../actions/actionTypes";

const initialState = {
  loading : false,
  error: "",
};

const importReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_IMPORT_DONE:
      return {...state, loading: false};
    case types.SET_IMPORT_START:
      return {...state, loading: true};
    case types.SET_IMPORT_ERROR:
      return {...state, loading: false, error : action.data};
    default:
      return state;
  }
}

export default importReducer;