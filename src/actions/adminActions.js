import axios from "axios";
import * as types from "./actionTypes";

function receiveLogin(data) {
  return {
    type : types.GET_SETTINGS,
    data : data
  }
};

function receiveRacesAndStages(data) {
  return {
    type : types.GET_RACES_AND_STAGES,
    data : data
  }
};

export function getSettingsFromAPI() {
  return function (dispatch) {
    return axios({
      url : "http://prod-api.tourlive.ch/settings",
      timeout : 20000,
      method: 'get',
      responseType: 'json'
    }). then(function (response) {
      dispatch(receiveLogin(response.data));
    })
  }
}

export function getRacesAndStagesFromAPI() {
  return function (dispatch) {
    return axios({
      url : "http://prod-api.tourlive.ch/races",
      timeout: 20000,
      method: 'get',
      responseType: 'json'
    }).then(function (response) {
      dispatch(receiveRacesAndStages(response.data));
    })
  }
}
