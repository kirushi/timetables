import axios from 'axios';
import { browserHistory } from 'react-router';

import { ALL_TRAINERS_URL, POST_TRAINER_URL } from '../configuration';
import { handleError } from '../services/service_error';
import { GET_TRAINERS, POST_TRAINER } from './types';

export function getTrainers(token) {
  return (dispatch) => {
    axios({
      url: ALL_TRAINERS_URL,
      method: 'GET',
      headers: {'Authorization': `Token token=${token}`}
    }).then(response => {
      dispatch({ type: GET_TRAINERS, payload: response.data });
    }).catch(errorObj => {
      handleError(errorObj, dispatch);
    })
  }
}

export function postTrainer(trainer, token) {
  return (dispatch) => {
    axios({
      url: POST_TRAINER_URL,
      method: 'POST',
      headers: {'Authorization': `Token token=${token}`},
      data: {
        trainer: trainer
      }
    }).then(response => {
      dispatch({
        type: POST_TRAINER,
        payload: response
      })
      browserHistory.push('/users');
    }).catch(error => {
      handleError(error, dispatch)
    })
  }
}
