import { GET_MEMBERS, POST_MEMBER } from '../actions/types';

const INITIAL_DATA = []

export default function( state = INITIAL_DATA, action ) {
  switch(action.type) {
    case GET_MEMBERS:
      return action.payload
    case POST_MEMBER:
      const dataItem = action.payload.data;
      return [...state, dataItem];
  }
  return state;
}
