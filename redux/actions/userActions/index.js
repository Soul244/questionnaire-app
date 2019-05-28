import axios from '~redux/axios';
import { asyncTypes } from '~redux/types';

/* #region Sign Up */
export function postSignUpAction(payload) {
  return {
    type: asyncTypes.POST_SIGNUP,
    payload,
  };
}
export function postSignUp(user) {
  return async (dispatch) => {
    try {
      const response = await axios.post('/users/signup', user);
      dispatch(postSignUpAction(response.data));
    } catch (error) {
      throw error;
    }
  };
}
/* #endregion */

/* #region Login */
export function postLoginAction(payload) {
  return {
    type: asyncTypes.POST_LOGIN,
    payload,
  };
}

export function postLoginActionStart() {
  return {
    type: asyncTypes.POST_LOGIN_START,
  };
}

export function postLogin(user) {
  return async (dispatch) => {
    try {
      dispatch(postLoginActionStart());
      const response = await axios.post('/users/login', user);
      localStorage.setItem('_id', response.data._id);
      localStorage.setItem('email', response.data.email);
      localStorage.setItem('token', response.data.token);
      dispatch(postLoginAction(response.data));
    } catch (error) {
      throw error;
    }
  };
}
/* #endregion */

/* #region Reset Password */
export function postResetPasswordAction(payload) {
  return {
    type: asyncTypes.POST_RESET_PASSWORD,
    payload,
  };
}

export function postResetPassword(email) {
  return async (dispatch) => {
    try {
      const response = await axios.post('/users/reset-password', {
        email,
      });
      dispatch(postResetPasswordAction(response.data));
    } catch (error) {
      throw error;
    }
  };
}

/* #endregion */

/* #region Is Token Valid */
export function postIsTokenValidAction(payload) {
  return {
    type: asyncTypes.POST_TOKEN_IS_VALID,
    payload,
  };
}

export function postIsTokenValid(token) {
  return async (dispatch) => {
    try {
      const response = await axios.post('/users/token', {
        token,
      });
      dispatch(postIsTokenValidAction(response.data));
    } catch (error) {
      throw error;
    }
  };
}

/* #endregion */
