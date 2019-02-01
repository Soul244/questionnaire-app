/* eslint-disable no-param-reassign */
import {
  asyncTypes,
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
    case asyncTypes.POST_SIGNUP:
      state = {
        ...state,
        message: action.payload.message,
      };
      break;
    case asyncTypes.POST_LOGIN:
      state = {
        ...state,
        id: action.payload.id,
        emaiş: action.payload.email,
        isTokenValid: action.payload.isTokenValid,
        token: action.payload.token,
        message: action.payload.message,
      };
      break;
    case asyncTypes.POST_RESET_PASSWORD:
      state = {
        ...state,
        message: action.payload.message,
      };
      break;
    case asyncTypes.POST_TOKEN_IS_VALID:
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
