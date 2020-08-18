
// @flow

import { userTypes } from './actionTypes';
import { APIError } from '../utils/errors';
import parseError from '../utils/parseError';
import config from '../config';

export interface User {
  name: string,
  lastName: string,
  email: string,
  password: string
}

const { BASE_URL } = config;

export function create(user: User) {
  return async function (dispatch) {
    const url = `${BASE_URL}/users`
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    const content = await response.json();
    if (!response.ok) {
      const error = new APIError<User>(content.message);
      const errors = parseError<User>(content.message);
      error.details = errors;
      throw error;
    }
    dispatch({type: userTypes.created});
  }
}
