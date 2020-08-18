
// @flow

import { authTypes } from './actionTypes';
import { APIError } from '../utils/errors';
import parseError from '../utils/parseError';
import config from '../config';

export interface Credentials {
  email: string,
  password: string
}

const { BASE_URL } = config;

export function login(credentials: Credentials) {
  return async function (dispatch) {
    const url = `${BASE_URL}/auth/login`
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'content-type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
    const content = await response.json();
    if (!response.ok) {
      const error = new APIError<Credentials>(content.message);
      const errors = parseError<Credentials>(content.message);
      error.details = errors;
      throw error;
    }
    dispatch({
      type: authTypes.logged,
      token: content.token,
      profile: content.profile
    });
  }
}
