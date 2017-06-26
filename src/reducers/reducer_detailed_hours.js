import { ALL_HOURS, ALL_DETAILED_HOURS } from '../actions/types';

const INITIAL_DATA = []

export default function( state = INITIAL_DATA, action ) {
  switch(action.type) {
    case ALL_DETAILED_HOURS:
      return action.payload
  }
  return state;
}
