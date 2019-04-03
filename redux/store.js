/* eslint-disable no-param-reassign */
/* eslint-disable global-require */
/* eslint-disable import/prefer-default-export */
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import pollReducer from './reducers/pollReducer';
import participantReducer from './reducers/participantReducer';
import userReducer from './reducers/userReducer';

const reducers = combineReducers({
  pollReducer,
  participantReducer,
  userReducer,
});

export const initStore = () => createStore(
  reducers,
  applyMiddleware(thunk, logger),
);
