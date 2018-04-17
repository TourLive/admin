import * as types from "../actions/actionTypes";

const initialState = {
  username : "",
  password: "",
  error: "",
  loggedIn : false
};

function setLocalStorage(data) {
    localStorage.setItem("USER", data.username);
    localStorage.setItem("PASSWORD", data.password);
}

function cleanLocalStorage() {
    localStorage.removeItem("USER");
    localStorage.removeItem("PASSWORD");
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
      case types.UNSET_USER:
        cleanLocalStorage();
        return {...state, username: "", password:"", loggedIn:false};
      case types.SET_USER:
        setLocalStorage(action.data);
        return {...state, username: action.data.username, password:action.data.password, loggedIn:true, error:""};
      case types.SET_USER_ERROR:
          cleanLocalStorage();
          return {...state, error:action.data};
    default:
      return state;
  }
}

export default userReducer;