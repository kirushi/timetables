import { FETCH_USERS, DELETE_USER } from '../actions/types';

const INITIAL_DATA = [];

export default function(state = INITIAL_DATA, action ) {
  switch(action.type) {
    case FETCH_USERS:
      const data = action.payload.data;
      return data;
    case DELETE_USER:
      let arr = state;
      let index = -1;
      arr.some((x, i) => { if (x.id === action.payload) { index = i; } });
      if (index > -1) { arr.splice(index, 1) };
      return [...arr];
  }
  return state;
}
