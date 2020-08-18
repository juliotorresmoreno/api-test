
import { combineReducers } from 'redux';
import authReducer from './auth';
import usersReducer from './users';
import newsReducer from './news';

const rootReducer = combineReducers({
  auth: authReducer,
  users: usersReducer,
  news: newsReducer
});

export default rootReducer;