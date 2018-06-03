import axios from 'axios/index';
import store from '../store';
import * as api from '../utils/api';
import * as types from './actionTypes'

function deleteRaceError (error) {
  return {
    type : types.SET_DELETE_RACE_ERROR,
    data : error
  }
}

function deleteRaceDone () {
  return {
    type : types.SET_DELETE_RACE_DONE
  }
}

function deleteRaceStart () {
  return {
    type : types.SET_DELETE_RACE_START
  }
}

export function deleteActualRace() {
  return function (dispatch) {
    dispatch(deleteRaceStart());
    return axios({
      url: api.LINK_IMPORT,
      timeout: 20000,
      method: 'delete',
      responseType: 'json',
      headers: {
        "Csrf-Token": "nocheck"
      },
      auth: {
        username: store.getState().user.username,
        password: store.getState().user.password
      }
    }).then(function (response) {
      if(response.status === 200) {
        dispatch(deleteRaceDone());
      } else {
        dispatch(deleteRaceError("Invalid api call"));
      }
    }).catch(function (error) {
      let errorObject = JSON.parse(JSON.stringify(error));
      dispatch(deleteRaceError(errorObject.response.data));
    })
  }
}