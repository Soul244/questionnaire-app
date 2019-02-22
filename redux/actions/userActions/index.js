import axios from '../../axios';
import {
  asyncTypes
} from '../../types';

/* #region Actions */
export function postSignUpAction(payload) {
  return {
    type: asyncTypes.POST_SIGNUP,
    payload,
  };
}

export function postLoginAction(payload) {
  return {
    type: asyncTypes.POST_LOGIN,
    payload,
  };
}

export function postIsTokenValidAction(payload) {
  return {
    type: asyncTypes.POST_TOKEN_IS_VALID,
    payload,
  };
}

export function postResetPasswordAction(payload) {
  return {
    type: asyncTypes.POST_RESET_PASSWORD,
    payload,
  };
}
/* #endregion */
/* #region Functions */
export function postSignUp(user) {
  return async (dispatch) => {
    try {
      const response = await axios.post(`/users/signup`, user);
      dispatch(postSignUpAction(response.data));
    } catch (error) {
      throw error;
    }
  };
}

export function postLogin(user) {
  return async (dispatch) => {
    try {
      const response = await axios.post(`/users/login`, user);
      localStorage.setItem('auth', JSON.stringify(response.data));
      dispatch(postLoginAction(response.data));
    } catch (error) {
      throw error;
    }
  };
}

export function postResetPassword(email) {
  return async (dispatch) => {
    try {
      const response = await axios.post(`/users/reset-password`, {
        email
      });
      localStorage.setItem('auth', JSON.stringify(response.data));
      dispatch(postResetPasswordAction(response.data));
    } catch (error) {
      throw error;
    }
  };
}

export function postIsTokenValid(token) {
  return async (dispatch) => {
    try {
      const response = await axios.post(`/users/token`, {
        token
      });
      localStorage.setItem('auth', JSON.stringify(response.data));
      dispatch(postIsTokenValidAction(response.data));
    } catch (error) {
      throw error;
    }
  };
}

/* #endregion */