/* eslint-disable no-param-reassign */
import {
  GET_PARTICIPANTS, POST_PARTICIPANT, DELETE_PARTICIPANT,
  ADD_PARTICIPANT_ANSWER, ADD_PARTICIPANT_NAME, ADD_PARTICIPANT_SURNAME, ADD_PARTICIPANT_EMAIL,
} from '../types';

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
    case ADD_PARTICIPANT_ANSWER:
      state = {
        ...state,
        answers: action.payload,
      };
      break;
    case ADD_PARTICIPANT_NAME:
      state = {
        ...state,
        name: action.payload,
      };
      break;
    case ADD_PARTICIPANT_SURNAME:
      state = {
        ...state,
        surname: action.payload,
      };
      break;
    case ADD_PARTICIPANT_EMAIL:
      state = {
        ...state,
        email: action.payload,
      };
      break;
    case GET_PARTICIPANTS:
      state = {
        ...state,
        participants: action.payload,
      };
      break;
    case POST_PARTICIPANT:
      state = {
        ...state,
        message: action.payload.message,
      };
      break;
    case DELETE_PARTICIPANT:
      state = {
        ...state,
        participants: action.payload,
      };
      break;
    default: {
      return state;
    }
  }
  return state;
};

export default participantReducer;
