import axios from 'axios';
import { browserHistory } from 'react-router';

import { ALL_MEMBERS_URL, POST_MEMBER_URL } from '../configuration';
import { handleError } from '../services/service_error';
import { GET_MEMBERS, POST_MEMBER } from './types';

export function getMembers(token) {
  return (dispatch) => {
    axios({
      url: ALL_MEMBERS_URL,
      method: 'GET',
      headers: {'Authorization': `Token token=${token}`}
    }).then(response => {
      dispatch({ type: GET_MEMBERS, payload: response.data });

    }).catch(errorObj => {
      handleError(errorObj, dispatch)
    })
  }
}

export function postMember(member, token) {
  return (dispatch) => {
    axios({
      url: POST_MEMBER_URL,
      method: 'POST',
      headers: {'Authorization': `Token token=${token}`},
      data: {
        member: member
      }
    }).then(response => {
      dispatch({
        type: POST_MEMBER,
        payload: response
      })
      browserHistory.push('/users');
    }).catch(error => {
      handleError(error, dispatch)
    })
  }
}
