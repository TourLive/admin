import * as types from "../actions/actionTypes";

const initialState = {
  loading : false,
  error: "",
};

const importGPXReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_IMPORT_GPX_DONE:
      return {...state, loading: false};
    case types.SET_IMPORT_GPX_START:
      return {...state, loading: true};
    case types.SET_IMPORT_GPX_ERROR:
      return {...state, loading: false, error : action.data};
    default:
      return state;
  }
}

export default importGPXReducer;