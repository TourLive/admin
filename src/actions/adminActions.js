import axios from "axios";
import * as types from "./actionTypes";
import store from "../store"

function receiveSettings(data) {
  return {
    type : types.GET_SETTINGS,
    data : data
  }
}

function receiveRacesAndStages(data) {
  return {
    type : types.GET_RACES_AND_STAGES,
    data : data
  }
}

function sucessfullLogin(data) {
  return {
    type : types.SET_USER,
    data : data
  }
}

function receiveLoginError(error) {
  return {
    type : types.SET_USER_ERROR,
    data : error
  }
}

function receiveLogout() {
    return {
        type: types.UNSET_USER
    }
}

function receiveSettingsError (error) {
  return {
    type : types.SET_SETTINGS_ERROR,
    data : error
  }
};

export function getSettingsFromAPI() {
  return function (dispatch) {
    return axios({
      url : "http://localhost:9000/settings",
      timeout : 20000,
      method: 'get',
      responseType: 'json'
    }). then(function (response) {
      dispatch(receiveSettings(response.data));
    })
  }
}

export function getRacesAndStagesFromAPI() {
  return function (dispatch) {
    return axios({
      url : "http://localhost:9000/races",
      timeout: 20000,
      method: 'get',
      responseType: 'json'
    }).then(function (response) {
      dispatch(receiveRacesAndStages(response.data));
    })
  }
}

export function postLogin(user) {
    return function (dispatch) {
      axios.post("http://localhost:9000/login", user).then(function (response) {
          if(response.status === 200) {
              console.log(response);
              dispatch(sucessfullLogin(user));
          } else {
              console.log(response);
              dispatch(receiveLoginError("Combination of username and password not found"));
          }
      }).catch(function (response) {
          console.log(response);
          dispatch(receiveLoginError(response));
      });
    }
}

export function putSettings(setting) {
  console.log("PUT" + store.getState().user.username);
  console.log("PUT" + store.getState().user.password);
  return function (dispatch) {
    axios.put("http://localhost:9000/settings", setting, {
      headers: {
        "Csrf-Token": "nocheck"
      },
      auth: {
        username: store.getState().user.username,
        password: store.getState().user.password
      }
    }).then(function (response) {
      if(response.status === 200) {
        console.log(response);
        dispatch(getSettingsFromAPI());
      } else {
        console.log(response);
        dispatch(receiveSettingsError("Invalid api call"));
      }
    }).catch(function (response) {
      console.log(response);
      dispatch(receiveSettingsError);
    })

  }
}

export function logout() {
    return function (dispatch) {
        dispatch(receiveLogout());
    }
}
