import { ENABLE_SESSION, DISABLE_SESSION } from '../actions/types';

const INITIAL_DATA = [];

export default function( state = INITIAL_DATA, action ) {
  switch(action.type) {
    case ENABLE_SESSION:
      let enabledArr = [...state];
      if (enabledArr.indexOf(action.payload) > -1) {
        return enabledArr;
      } else {
        enabledArr.push(action.payload);
        return enabledArr;
      }
    case DISABLE_SESSION:
      let arr = [...state];
      const index = arr.indexOf(action.payload);
      if (index > -1) { arr.splice(index, 1) };
      return arr;
  }
  return state;
}
