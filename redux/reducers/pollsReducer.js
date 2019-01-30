/* eslint-disable no-param-reassign */
import {
  GET_POLL,
  POST_POLL,
  UPDATE_POLL,
  DELETE_POLL,
  GET_POLLS,
  GET_PREVIEW_POLL,
  GET_ALL_POLLS,
  GET_ALL_POLLS_START,
  GET_ALL_POLLS_ERROR,
} from '../types';

const initialState = {
  polls: [],
  allPolls: [],
  count: 0,
  poll: {},
  message: '',
  fetching: false,
  fetched: false,
  error: null,
};

const pollsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_POLLS:
      state = {
        ...state,
        allPolls: action.payload.polls,
        count: action.payload.count,
        fetching: false,
        fethed: true,
      };
      break;
    case GET_ALL_POLLS_START:
      state = {
        ...state,
        fetching: true,
      };
      break;
    case GET_ALL_POLLS_ERROR:
      state = {
        ...state,
        error: action.payload.error,
      };
      break;
    case GET_POLL:
      state = {
        ...state,
        poll: action.payload,
      };
      break;
    case GET_PREVIEW_POLL:
      state = {
        ...state,
        poll: action.payload,
      };
      break;
    case POST_POLL:
      state = {
        ...state,
        message: action.payload.message,
      };
      break;
    case UPDATE_POLL:
      state = {
        ...state,
        message: action.payload.message,
      };
      break;
    case DELETE_POLL:
      state = {
        ...state,
        polls: action.payload.newPolls,
        message: action.payload.message,
      };
      break;
    case GET_POLLS:
      state = {
        ...state,
        polls: action.payload.polls,
        message: action.payload.message,
      };
      break;
    default: {
      return state;
    }
  }
  return state;
};

export default pollsReducer;
