import axios from 'axios';
import { browserHistory } from 'react-router';

import { ALL_USERS_URL, DELETE_USER_URL } from '../configuration';
import { FETCH_USERS, DELETE_USER } from './types';
import { handleError } from '../services/service_error';

export function fetchUsers(token) {
  return (dispatch) => {
    axios({
      url: ALL_USERS_URL,
      method: 'GET',
      headers: {'Authorization': `Token token=${token}`}
    }).then(response => {
      dispatch({
        type: FETCH_USERS,
        payload: response
      })
    }).catch(error => {
      handleError(error, dispatch);
    })
  }
}

export function deleteUser(id, token) {
  return (dispatch) => {
    axios({
      url: `${DELETE_USER_URL}/${id}`,
      method: 'DELETE',
      headers: {'Authorization': `Token token=${token}`},
    }).then(response => {
      dispatch({
        type: DELETE_USER,
        payload: id
      })
    }).catch(error => {
      handleError(error, dispatch);
    })
  }
}
