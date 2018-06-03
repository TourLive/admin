import axios from "axios";
import * as types from "./actionTypes";
import store from "../store"
import * as api from "../utils/api";

function receiveSettings(data) {
  return {
    type : types.GET_SETTINGS,
    data : data
  }
}

function setAllStages(data) {
    return {
        type : types.SET_ALL_STAGES,
        data : data
    }
}

function receiveLocalUsername() {
  return {
      type: types.GET_LOCAL_STORAGE,
      data: false
  }
}

function receiveRacesAndStages(data) {
  return {
    type : types.GET_RACES_AND_STAGES,
    data : data
  }
}

function receiveGPXTracks(data, stageID) {
    return {
        type : types.GET_GPXTRACKS,
        data : data,
        id: stageID
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

function saveCnlabRaceId(id) {
    return {
        type : types.SET_CNLAB_DATA,
        data : id
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

function deleteDone() {
    return {
        type : types.DELETE_DONE
    }
}

function displayDelete() {
    return {
        type : types.DISPLAY_DELETE
    }
}

function deleteError(error) {
    return {
        type : types.DELETE_ERROR,
        data : error
    }
}

export function getSettingsFromAPI() {
  return function (dispatch) {
    return axios.get(api.LINK_SETTINGS).then(function (response) {
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
      url: api.LINK_RACES,
      timeout: 20000,
      method: 'get',
      responseType: 'json'
    }).then(function (response) {
      dispatch(receiveRacesAndStages(response.data));
    })
  }
}

export function getGPXTrack(stageID) {
    return function (dispatch) {
        return axios({
            url: api.LINK_GPXTRACKS + "/" + stageID,
            timeout: 20000,
            method: 'get',
            responseType: 'json'
        }).then(function (response) {
            dispatch(receiveGPXTracks(response.data, stageID));
        })
    }
}

export function deleteActualRace() {
    return function (dispatch) {
        return axios({
            url: api.LINK_IMPORT,
            timeout: 20000,
            method: 'delete',
            responseType: 'json'
        }).then(function (response) {
            dispatch(deleteDone());
        }).catch(function (error) {
            let errorObject = JSON.parse(JSON.stringify(error));
            dispatch(deleteError(errorObject.response.data));
        })
    }
}

export function postLogin(user) {
    return function (dispatch) {
      axios.post(api.LINK_LOGIN, user).then(function (response) {
          if(response.status === 200) {
              dispatch(sucessfullLogin(user));
          } else {
              dispatch(receiveLoginError("Combination of username and password not found"));
          }
      }).catch(function (error) {
          let errorObject = JSON.parse(JSON.stringify(error));
          dispatch(receiveLoginError(errorObject.response.data));
      });
    }
}

export function putSettings(setting) {
  return function (dispatch) {
    axios.put(api.LINK_SETTINGS, setting, {
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
    }).catch(function (error) {
      let errorObject = JSON.parse(JSON.stringify(error));
      dispatch(receiveSettingsError(errorObject.response.data));
    })

  }
}

export function initialImport() {
  return function (dispatch) {
    dispatch(importStart());
    axios.get(api.LINK_IMPORT, {
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
      } else if (response.status === 403) {
        dispatch(importError("Race already exists, delete it first"));
        dispatch(displayDelete());
      } else {
        dispatch(importError("Invalid api call"));
      }
    }).catch(function (error) {
      let errorObject=JSON.parse(JSON.stringify(error));
      if (errorObject.response.status === 403) {
        dispatch(importError("Race already exists, delete it first"));
      } else {
        dispatch(importError(errorObject.response.data));
      }
    })
  }
}

export function getAllStagesForStatus() {
    return function (dispatch) {
        dispatch(getRacesAndStagesFromAPI()).then(function () {
            let races = store.getState().races.data;
            let array = [];
            races.map((element) => {
                return element.stages.map(sub => {
                    return array.push({raceID: element.id, stageID: sub.id, status: false});
                })
            });
            dispatch(setAllStages(array));
            array.forEach(element => {
                store.dispatch(getGPXTrack(element.stageID));
            });
        });
    }
}

export function getCnlabInfo() {
    return function (dispatch) {
        return axios({
            url: api.LINK_CNLAB_SETTINGS,
            timeout: 20000,
            method: 'get',
            responseType: 'json'
        }).then(function (response) {
            if (response.status === 200) {
                let cnlabRaceID = response.data[5].parameter;
                dispatch(saveCnlabRaceId(cnlabRaceID));
            }
        })
    }
}

export function logout() {
    return function (dispatch) {
        dispatch(receiveLogout());
    }
}

export function getLocalUsername() {
    return function (dispatch) {
        dispatch(receiveLocalUsername());
    }
}
