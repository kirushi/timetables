import { AUTH_USER, UNAUTH_USER, AUTH_ERROR } from '../actions/types';

const INITIAL_DATA = { authenticated: false, error: '', token: '', user: {} };

export default function(state = INITIAL_DATA, action) {
  switch(action.type) {
    case AUTH_USER:
      return {
        ...state,
        authenticated: true,
        error: '',
        token: action.payload.token,
        user: action.payload.user
      };
    case UNAUTH_USER:
      return {
        ...state,
        authenticated: false,
        error: '',
        token: '',
        user: {}
      };
    case AUTH_ERROR:
      return {
        ...state,
        authenticated: false,
        error: action.payload,
        token: '',
        user: {}
      };
  }
  return state;
}
