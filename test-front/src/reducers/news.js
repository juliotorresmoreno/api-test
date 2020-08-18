
// @flow

import { newsTypes } from '../actions/actionTypes';
import { NewsState } from '../store/types';

const defaultState: NewsState = {
  data: []
};

interface ActionListed {
  data: Post[]
}

/**
 * 
 * @param {defaultState} state 
 * @param {import('redux').AnyAction} action 
 */
const newsReducer = function (state = defaultState, action): NewsState {
  if (action.type === newsTypes.listed) {
    const actionListed: ActionListed = action;
    return {
      data: actionListed.data
    }
  }
  return state;
};

export default newsReducer;
