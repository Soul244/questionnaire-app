/* eslint-disable no-param-reassign */
import { asyncTypes, syncTypes } from '../types';

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
    case asyncTypes.GET_ALL_POLLS:
      state = {
        ...state,
        allPolls: action.payload.polls,
        count: action.payload.count,
        fetching: false,
        fethed: true,
      };
      break;
    case asyncTypes.GET_ALL_POLLS_START:
      state = {
        ...state,
        fetching: true,
      };
      break;
    case asyncTypes.GET_ALL_POLLS_ERROR:
      state = {
        ...state,
        error: action.payload.error,
      };
      break;
    case asyncTypes.GET_POLLS:
      state = {
        ...state,
        polls: action.payload.polls,
        message: action.payload.message,
        fetching: false,
        fethed: true,
      };
      break;
    case asyncTypes.GET_POLLS_START:
      state = {
        ...state,
        fetching: true,
      };
      break;
    case asyncTypes.GET_POLLS_ERROR:
      state = {
        ...state,
        error: action.payload.error,
      };
      break;
    case asyncTypes.GET_POLL:
      state = {
        ...state,
        poll: action.payload,
      };
      break;
    case syncTypes.GET_PREVIEW_POLL:
      state = {
        ...state,
        poll: action.payload,
      };
      break;
    case asyncTypes.POST_POLL:
      state = {
        ...state,
        message: action.payload.message,
      };
      break;
    case asyncTypes.UPDATE_POLL:
      state = {
        ...state,
        message: action.payload.message,
      };
      break;
    case asyncTypes.DELETE_POLL:
      state = {
        ...state,
        polls: action.payload.newPolls,
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
