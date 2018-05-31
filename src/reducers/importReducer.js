import * as types from "../actions/actionTypes";

const initialState = {
  loading : false,
  error: "",
  displayError : "",
  delete: false,
  displayDelete: false
};

const importReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_IMPORT_DONE:
      return {...state, loading: false};
    case types.DISPLAY_DELETE:
      return {...state, displayDelete: true};
    case types.DELETE_DONE:
      return {...state, delete: true, displayDelete: false};
    case types.DELETE_ERROR:
      return {...state, deleteError: action.data};
    case types.SET_IMPORT_START:
      return {...state, loading: true};
    case types.SET_IMPORT_ERROR:
      return {...state, loading: false, error : action.data};
    default:
      return state;
  }
};

export default importReducer;