/* eslint-disable no-param-reassign */
/* eslint-disable global-require */
/* eslint-disable import/prefer-default-export */
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import poll from './reducers/pollReducer';
import polls from './reducers/pollsReducer';
import participant from './reducers/participantReducer';
import user from './reducers/userReducer';

const reducers = combineReducers({
  poll,
  polls,
  participant,
  user,
});

export const initStore = () => createStore(
  reducers,
  applyMiddleware(thunk),
);
