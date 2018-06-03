import axios from 'axios/index';
import store from '../store';
import * as api from '../utils/api';
import * as types from './actionTypes'

function importTimingError (error) {
  return {
    type : types.SET_IMPORT_TIMING_ERROR,
    data : error
  }
}

function importTimingDone () {
  return {
    type : types.SET_IMPORT_TIMING_DONE
  }
}

function importTimingStart () {
  return {
    type : types.SET_IMPORT_TIMING_START
  }
}

export function postTimingData(data, id) {
  return function (dispatch) {
    dispatch(importTimingStart());
    axios.put(api.LINK_UPDATE + "/" + id, data, {
      headers: {
        "Csrf-Token": "nocheck",
        'Content-Type': 'application/xml'
      },
      auth: {
        username: store.getState().user.username,
        password: store.getState().user.password
      }
    }).then(function (response) {
      if(response.status === 200) {
        dispatch(importTimingDone());
      } else {
        dispatch(importTimingError("Invalid api call"));
      }
    }).catch(function (error) {
      let errorObject = JSON.parse(JSON.stringify(error));
      dispatch(importTimingError(errorObject.response.data));
    })

  }
}