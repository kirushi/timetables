import axios from 'axios';
import { browserHistory } from 'react-router';

import { POST_SESSION_URL, TOKEN_ACCESSOR, DELETE_SESSION_URL } from '../configuration';
import { handleError } from '../services/service_error';
import { POST_SESSION, DISABLE_SESSION, ENABLE_SESSION, DELETE_SESSION } from './types';

export function postSession(session, members_arr, trainers_arr, token) {
  return (dispatch) => {
    axios({
      url: POST_SESSION_URL,
      method: 'POST',
      headers: {'Authorization': `Token token=${token}`},
      data: {
        session: session,
        members_arr,
        trainers_arr,
      }
    }).then(response => {
      dispatch({
        type: POST_SESSION,
        payload: response
      })
      browserHistory.push('/classes');
    }).catch(error => {
      handleError(error, dispatch)
    })
  }
}

export function enableSession(id) {
  return (dispatch) => {
    dispatch({
      type: ENABLE_SESSION,
      payload: id
    })
  }
}

export function deleteSession(id, token) {
  return (dispatch) => {
    axios({
      url: `${DELETE_SESSION_URL}/${id}`,
      method: 'DELETE',
      headers: {'Authorization': `Token token=${token}`},
    }).then(response => {
      dispatch({
        type: DELETE_SESSION,
        payload: id
      })
    }).catch(error => {
      handleError(error, dispatch);
    })
  }
}

export function disableSession(id) {
  return (dispatch) => {
    dispatch({
      type: DISABLE_SESSION,
      payload: id
    })
  }
}
