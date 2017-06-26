import moment from 'moment';
import * as axios from 'axios';

import {
  getCurrentWeekArray,
  getAllHoursInDay,
  getDetailHoursInDay
} from '../services/service_time';

import { handleError } from '../services/service_error';

import {
  ALL_SESSIONS_URL,
  TOKEN_ACCESSOR,
  ROLES_ACCESSOR
} from '../configuration';

import {
  NEXT_WEEK,
  PREVIOUS_WEEK,
  CURRENT_WEEK,
  SELECTED_DATE,
  FETCH_SESSIONS,
  ALL_HOURS,
  ALL_DETAILED_HOURS,
  AUTH_USER
} from './types';

export function initialData(current_time) {
  return function(dispatch) {
    const week = getCurrentWeekArray();
    const selectedDate = current_time;
    const hours = getAllHoursInDay(current_time, 6, 23);
    const detailedHours = getDetailHoursInDay(current_time, 6, 23);
    dispatch({
      type: ALL_HOURS,
      payload: hours
    })
    dispatch({
      type: ALL_DETAILED_HOURS,
      payload: detailedHours
    })
    dispatch({
      type: SELECTED_DATE,
      payload: selectedDate
    });
    dispatch({
      type: CURRENT_WEEK,
      payload: week
    });

    // check if token exists
    const sessionData = JSON.parse(localStorage.getItem(TOKEN_ACCESSOR));

    if (sessionData) {
      const { user, token } = sessionData;
      dispatch({
        type: AUTH_USER,
        payload: { user, token }
      })
    }

    axios.get(ALL_SESSIONS_URL)
    .then(response => {
      dispatch({
        type: FETCH_SESSIONS,
        payload: response
      })
    })
    .catch(error => {
      handleError(error, dispatch);
    });
  }
}
