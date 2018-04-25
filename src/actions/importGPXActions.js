import axios from 'axios/index';
import store from '../store';
import * as api from '../utils/api';
import * as types from './actionTypes'

function importGPXError (error) {
  return {
    type : types.SET_IMPORT_GPX_ERROR,
    data : error
  }
}

function importGPXDone () {
  return {
    type : types.SET_IMPORT_GPX_DONE,
  }
}

function importGPXStart () {
  return {
    type : types.SET_IMPORT_GPX_START
  }
}

export function postGPXData(data, id) {
  return function (dispatch) {
    dispatch(importGPXStart());
    axios.post(api.LINK_GPXTRACKS + "/" + id, data, {
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
        dispatch(importGPXDone());
      } else {
        dispatch(importGPXError("Invalid api call"));
      }
    }).catch(function (response) {
      dispatch(importGPXError(response));
    })

  }
}