import * as types from "../actions/actionTypes";

const initialState = {
  username : "",
  password: ""
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_USER:
      return Object.assign({}, state, {
        username: action.data.username,
        password: action.data.password
      });
    default:
      return state;
  }
}

export default userReducer;