/* eslint-disable no-param-reassign */
import { asyncTypes, syncTypes } from '../types';

const initialState = {
  participant: {
    name: '',
    surname: '',
    email: '',
    pollId: Number,
    answers: [],
  },
  participants: [],
  message: '',
};

const participantReducer = (state = initialState, action) => {
  switch (action.type) {
    case syncTypes.ADD_PARTICIPANT_ANSWER:
      state = {
        ...state,
        participant: {
          ...state.participant,
          answers: action.payload,
        },
      };
      break;
    case syncTypes.ADD_PARTICIPANT_NAME:
      state = {
        ...state,
        participant: {
          ...state.participant,
          name: action.payload,
        },
      };
      break;
    case syncTypes.ADD_PARTICIPANT_SURNAME:
      state = {
        ...state,
        participant: {
          ...state.participant,
          surname: action.payload,
        },
      };
      break;
    case syncTypes.ADD_PARTICIPANT_EMAIL:
      state = {
        ...state,
        participant: {
          ...state.participant,
          email: action.payload,
        },
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
