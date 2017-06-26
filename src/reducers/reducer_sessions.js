import { FETCH_SESSIONS, POST_SESSION, DELETE_SESSION } from '../actions/types';

const INITIAL_DATA = [];

export default function( state = INITIAL_DATA, action ) {
  switch(action.type) {
    case FETCH_SESSIONS:
      const data = action.payload.data;
      return data;
    case POST_SESSION:
      const dataItem = action.payload.data;
      return [...state, dataItem];
    case DELETE_SESSION:
      let arr = state;
      let index = -1;
      arr.some((x, i) => { if (x.id === action.payload) { index = i; } });
      if (index > -1) { arr.splice(index, 1) };
      return [...arr];
  }
  return state;
}
