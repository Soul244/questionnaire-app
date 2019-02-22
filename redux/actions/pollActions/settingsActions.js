import {
  syncTypes
} from '../../types';

/* #region Actions - Input Type Radio Button */
export function hasAnswerTimeAction(payload) {
  return {
    type: syncTypes.ANSWER_TIME,
    payload,
  };
}

export function hasAnswerAutoChangeTimeAction(payload) {
  return {
    type: syncTypes.ANSWER_AUTO_CHANGE_TIME,
    payload,
  };
}

export function hasAnswerPercentAction(payload) {
  return {
    type: syncTypes.ANSWER_PERCENT,
    payload,
  };
}

export function showTypeAction(payload) {
  return {
    type: syncTypes.SHOW_TYPE,
    payload,
  };
}

export function typeAction(payload) {
  return {
    type: syncTypes.TYPE,
    payload,
  };
}

export function isPollActiveAction(payload) {
  return {
    type: syncTypes.POLL_ACTIVE,
    payload,
  };
}

export function pollTimeAction(payload) {
  return {
    type: syncTypes.ADD_POLL_TIME,
    payload,
  };
}

export function userDataCollectTypeAction(payload) {
  return {
    type: syncTypes.USER_DATA_COLLECT_TYPE,
    payload,
  };
}
/* #endregion */

/* #region Actions - Input Type Text */
export function hasPollTimeAction(payload) {
  return {
    type: syncTypes.POLL_TIME,
    payload,
  };
}

export function answerAutoChangeTimeAction(payload) {
  return {
    type: syncTypes.ADD_ANSWER_AUTO_CHANGE_TIME,
    payload,
  };
}

export function answerTimeAction(payload) {
  return {
    type: syncTypes.ADD_ANSWER_TIME,
    payload,
  };
}
/* #endregion */

/* #region Functions - Input Type Radio Button*/
export function handleHasPollTime(e) {
  return dispatch => dispatch(hasPollTimeAction({
    hasPollTime: e.target.value === "true" ? true : false
  }));
}

export function handleHasAnswerTime(e) {
  return dispatch => dispatch(hasAnswerTimeAction({
    hasAnswerTime: e.target.value === "true" ? true : false
  }));
}

export function handleHasAnswerAutoChangeTime(e) {
  return dispatch => dispatch(hasAnswerAutoChangeTimeAction({
    hasAnswerAutoChangeTime: e.target.value === "true" ? true : false
  }));
}

export function handleHasAnswerPercent(e) {
  return dispatch => dispatch(hasAnswerPercentAction({
    hasAnswerPercent: e.target.value === "true" ? true : false
  }));
}

export function handleShowType(e) {
  return dispatch => dispatch(showTypeAction({
    showType: e.target.value
  }));
}

export function handleType(e) {
  return dispatch => dispatch(typeAction({
    type: e.target.value
  }));
}

export function handleUserDataCollectType(e) {
  return dispatch => dispatch(userDataCollectTypeAction({
    userDataCollectType: e.target.value
  }));
}

export function handleIsPollActive(e) {
  return dispatch => dispatch(isPollActiveAction({
    isPollActive: e.target.value
  }));
}
/* #endregion */

/* #region Functions - Input Type Text */
export function handlePollTime(value) {
  return dispatch => dispatch(pollTimeAction({
    pollTime: value
  }));
}

export function handleAnswerAutoChangeTime(value) {
  return dispatch => dispatch(answerAutoChangeTimeAction({
    answerAutoChangeTime: value * 1000
  }));
}

export function handleAnswerTime(value) {
  return dispatch => dispatch(answerTimeAction({
    answerTime: value
  }));
}
/* #endregion */