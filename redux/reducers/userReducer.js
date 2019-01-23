/* eslint-disable no-param-reassign */
import {
  POST_SIGNUP, POST_LOGIN, POST_TOKEN_IS_VALID, POST_RESET_PASSWORD,
} from '../types';

const initialState = {
  id: '',
  email: '',
  isTokenValid: false,
  token: '',
  message: '',
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_SIGNUP:
      state = {
        ...state,
        message: action.payload.message,
      };
      break;
    case POST_LOGIN:
      state = {
        ...state,
        id: action.payload.id,
        emaiş: action.payload.email,
        isTokenValid: action.payload.isTokenValid,
        token: action.payload.token,
        message: action.payload.message,
      };
      break;
    case POST_RESET_PASSWORD:
      state = {
        ...state,
        message: action.payload.message,
      };
      break;
    case POST_TOKEN_IS_VALID:
      state = {
        ...state,
        isTokenValid: action.payload.isTokenValid,
      };
      break;
    default: {
      return state;
    }
  }
  return state;
};

export default userReducer;
