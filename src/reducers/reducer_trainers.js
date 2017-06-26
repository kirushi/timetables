import { GET_TRAINERS, POST_TRAINER } from '../actions/types';

const INITIAL_DATA = []

export default function( state = INITIAL_DATA, action ) {
  switch(action.type) {
    case GET_TRAINERS:
      return action.payload
    case POST_TRAINER:
      const dataItem = action.payload.data;
      return [...state, dataItem];
  }
  return state;
}
