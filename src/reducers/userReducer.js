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

function getLocalStorage() {
    let user = localStorage.getItem("USER");
    let pass = localStorage.getItem("PASSWORD");
    return {user, pass};
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
      case types.GET_LOCAL_STORAGE:
          const local = getLocalStorage();
          if (local.user  === null ||  local.pass === null) {
              return state;
          }
          return {...state, username : local.user, password : local.pass, loggedIn: true};
    default:
      return state;
  }
}

export default userReducer;