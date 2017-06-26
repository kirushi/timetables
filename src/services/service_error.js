import { TOKEN_ACCESSOR } from '../configuration';
import { authError } from '../actions';
import { UNAUTH_USER } from '../actions/types';

export function handleError(errorObj, dispatch) {
  console.log(errorObj);
  switch(errorObj.response.status) {
    case 401:
      localStorage.removeItem(TOKEN_ACCESSOR);
      dispatch({ type: UNAUTH_USER });
      dispatch(authError("Invalid email & password combination."));
      break;
  }
  return;
}
