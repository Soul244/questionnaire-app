/* eslint-disable no-param-reassign */
import {
  asyncTypes,
} from '../types';

const initialState = {
  id: '',
  email: '',
  isTokenValid: undefined,
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
        _id: action.payload._id,
        email: action.payload.email,
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
