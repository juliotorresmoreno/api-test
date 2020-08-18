
// @flow

import { userTypes, newsTypes } from './actionTypes';
import { APIError } from '../utils/errors';
import parseError from '../utils/parseError';
import config from '../config';
import { DefaultState } from '../store/types';

export interface Post {
  title: string,
  content: string,
  image: any
}

const { BASE_URL } = config;

export function create(post: Post) {
  return async function (dispatch, getState: () => DefaultState) {
    const token = getState().auth.token;
    const url = `${BASE_URL}/news`
    const dataForm = new FormData();
    dataForm.append('title', post.title);
    dataForm.append('content', post.content);
    dataForm.append('image', post.image);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: token
      },
      body: dataForm
    })
    const content = await response.json();
    if (!response.ok) {
      const error = new APIError<User>(content.message);
      const errors = parseError<User>(content.message);
      error.details = errors;
      throw error;
    }
    dispatch({ type: userTypes.created });
  }
}

interface Query {
  userId?: string,
  content?: string
}

function parseQuery(query: Query) {
  if (!query) {
    return '';
  }
  if (!query.content && !query.userId) {
    return '';
  }
  let result = '';
  if (query.userId) {
    result = '?userId=' + query.userId;
  }
  if (query.content) {
    if (query.userId) {
      result = result + '&';
    } else {
      result = '?';
    }
    result = result + 'content=' + query.content;
  }
  return result;
}

export function list(query: Query) {
  return async function (dispatch, getState: () => DefaultState) {
    const token = getState().auth.token;
    const queryParams = parseQuery(query);
    const url = `${BASE_URL}/news${queryParams}`

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: token
      }
    })
    const content = await response.json();
    if (!response.ok) {
      const error = new APIError<any>(content.message);
      const errors = parseError<any>(content.message);
      error.details = errors;
      throw error;
    }
    dispatch({
      type: newsTypes.listed,
      data: content.data
    });
  }
}

export function remove(postId: string) {
  return async function (dispatch, getState: () => DefaultState) {
    const token = getState().auth.token;
    const url = `${BASE_URL}/news/${postId}`

    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        Authorization: token
      }
    })
    const content = await response.json();
    if (!response.ok) {
      const error = new APIError<any>(content.message);
      const errors = parseError<any>(content.message);
      error.details = errors;
      throw error;
    }
    dispatch({
      type: newsTypes.deleted,
      data: content.data
    });
    dispatch(list());
  }
}