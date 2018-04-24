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
}

function importError (error) {
  return {
    type : types.SET_IMPORT_ERROR,
    data : error
  }
}

function importDone () {
  return {
    type : types.SET_IMPORT_DONE
  }
}

function importStart () {
  return {
    type : types.SET_IMPORT_START
  }
}

export function getSettingsFromAPI() {
  return function (dispatch) {
    return axios.get("http://localhost:9000/settings").then(function (response) {
       if (response.status) {
           dispatch(receiveSettings(response.data));
       } else if (response.status === 500) {
            var obj = {};
            obj.raceID = 0;
            obj.stageID = 0;
            dispatch(receiveSettings(obj));
       } else {
           // Do nothing
       }
    })
  }
}

export function getRacesAndStagesFromAPI() {
  return function (dispatch) {
    return axios({
      url: "http://localhost:9000/races",
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
              dispatch(sucessfullLogin(user));
          } else {
              dispatch(receiveLoginError("Combination of username and password not found"));
          }
      }).catch(function (response) {
          dispatch(receiveLoginError(response));
      });
    }
}

export function putSettings(setting) {
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
        dispatch(getSettingsFromAPI());
      } else {
        dispatch(receiveSettingsError("Invalid api call"));
      }
    }).catch(function (response) {
      dispatch(receiveSettingsError);
    })

  }
}

export function initialImport() {
  return function (dispatch) {
    dispatch(importStart());
    axios.get("http://localhost:9000/import", {
      headers: {
        "Csrf-Token": "nocheck"
      },
      auth: {
        username: store.getState().user.username,
        password: store.getState().user.password
      }
    }).then(function (response) {
      if(response.status === 200) {
        dispatch(importDone());
      } else {
        dispatch(importError("Invalid api call"));
      }
    }).catch(function (response) {
      dispatch(importError);
    })
  }
}

export function logout() {
    return function (dispatch) {
        dispatch(receiveLogout());
    }
}
