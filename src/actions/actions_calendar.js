import moment from 'moment';
import * as axios from 'axios';

import {
  getCurrentWeekArray,
  getNextWeekArray,
  getPreviousWeekArray,
  getAllHoursInDay,
  getWeekForDate
} from "../services/service_time";

import {
  NEXT_WEEK,
  PREVIOUS_WEEK,
  CURRENT_WEEK,
  SELECTED_DATE,
} from './types';

export function fetchCurrentWeek() {
  return function(dispatch) {
    const currentWeek = getCurrentWeekArray();
    dispatch({
      type: CURRENT_WEEK,
      payload: currentWeek
    })
  }
}

export function fetchNextWeek(currentWeek) {
  return function(dispatch) {
    const nextWeek = getNextWeekArray(currentWeek);
    dispatch({
      type: NEXT_WEEK,
      payload: nextWeek
    })
  }
}

export function fetchPreviousWeek(currentWeek) {
  return function(dispatch) {
    const previousWeek = getPreviousWeekArray(currentWeek);
    dispatch({
      type: PREVIOUS_WEEK,
      payload: previousWeek
    })
  }
}

export function setSelectedDate(date) {
  return function(dispatch) {
    const selectedDate = date;
    const week = getWeekForDate(date);
    dispatch({
      type: SELECTED_DATE,
      payload: selectedDate
    });
    dispatch({
      type: CURRENT_WEEK,
      payload: week
    });
  }
}
