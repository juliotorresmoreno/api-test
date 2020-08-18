
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../reducers';
import defaultState from './defaultState';

const localState = localStorage.getItem('state');

const state = localState ? JSON.parse(localState) : defaultState;

const store = createStore(
  rootReducer,
  // @ts-ignore
  state,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
);

window.removeEventListener("beforeunload", function () {
  localStorage.setItem('state', JSON.stringify(store.getState()))
});

window.onunload = function () {
  localStorage.setItem('state', JSON.stringify(store.getState()))
};

export default store;
