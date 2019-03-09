/* eslint-disable no-param-reassign */
import { asyncTypes, syncTypes } from '../types';

const initialState = {
  name: '',
  surname: '',
  email: '',
  message: '',
  pollId: Number,
  answers: [],
  participants: [],
};

const participantReducer = (state = initialState, action) => {
  switch (action.type) {
    case syncTypes.ADD_PARTICIPANT_ANSWER:
      state = {
        ...state,
        answers: action.payload,
      };
      break;
    case syncTypes.ADD_PARTICIPANT_NAME:
      state = {
        ...state,
        name: action.payload,
      };
      break;
    case syncTypes.ADD_PARTICIPANT_SURNAME:
      state = {
        ...state,
        surname: action.payload,
      };
      break;
    case syncTypes.ADD_PARTICIPANT_EMAIL:
      state = {
        ...state,
        email: action.payload,
      };
      break;
    case asyncTypes.GET_PARTICIPANTS:
      state = {
        ...state,
        participants: action.payload,
      };
      break;
    case asyncTypes.GET_PARTICIPANTS_ERROR:
      state = {
        ...state,
        message: action.payload,
      };
      break;
    case asyncTypes.POST_PARTICIPANT:
      state = {
        ...state,
        message: action.payload.message,
      };
      break;
    case asyncTypes.POST_PARTICIPANT_ERROR:
      state = {
        ...state,
        message: action.payload,
      };
      break;
    case asyncTypes.DELETE_PARTICIPANT:
      state = {
        ...state,
        participants: action.payload,
      };
      break;
    case asyncTypes.DELETE_PARTICIPANT_ERROR:
      state = {
        ...state,
        message: action.payload,
      };
      break;
    default: {
      return state;
    }
  }
  return state;
};

export default participantReducer;
