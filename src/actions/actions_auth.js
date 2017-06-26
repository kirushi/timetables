import axios from 'axios';
import { browserHistory } from 'react-router';

import { GET_TOKEN, TOKEN_ACCESSOR } from '../configuration';
import { handleError } from '../services/service_error';
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR } from './types';

export function loginUser(email, password) {
  return (dispatch) => {
    axios({
      url: GET_TOKEN,
      method: 'GET',
      auth: {
        username: email,
        password: password
      }
    }).then(response => {
      const { user, token } = response.data;
      dispatch({ type: AUTH_USER, payload: { user, token } });
      localStorage.setItem(TOKEN_ACCESSOR, JSON.stringify({ user, token }));
      browserHistory.push('/');
    }).catch(error => {
      handleError(error, dispatch);
    })
  }
}

export function logoutUser() {
  return (dispatch) => {
    localStorage.removeItem(TOKEN_ACCESSOR);
    dispatch({ type: UNAUTH_USER });
  }
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}
