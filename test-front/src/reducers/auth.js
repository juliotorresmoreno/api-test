
// @flow
import { authTypes } from '../actions/actionTypes';
import { AuthState } from '../store/types';

const defaultState: AuthState = {
  profile: {
    name: '',
    lastName: '',
    email: ''
  },
  logged: false,
  token: ''
};

const NoneAction = { type: '@NONE' };

interface ActionLogged {
  action: string,
  profile: {
    name: string,
    lastName: string,
    email: string
  },
  token: string
}


/**
 * 
 * @param {defaultState} state 
 * @param {import('redux').AnyAction} action 
 */
const authReducer = function (state = defaultState, action = NoneAction): AuthState {
  if (authTypes.logged === action.type) {
    const actionLogged: ActionLogged = action;
    if (actionLogged.token)
      return {
        logged: true,
        profile: actionLogged.profile,
        token: actionLogged.token
      };
    return {
      logged: false,
      profile: {
        email: '',
        lastName: '',
        name: ''
      },
      token: ''
    }
  }
  return state;
};

export default authReducer;
