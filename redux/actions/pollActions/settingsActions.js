import { syncTypes } from '../../types';

/* #region Actions - Input Type Radio Button */

/* #endregion */

/* #region Actions - Input Type Text */

/* #endregion */

/* #region Has Poll Time */
export function hasPollTimeAction(payload) {
  return {
    type: syncTypes.POLL_TIME,
    payload,
  };
}
export function handleHasPollTime(e) {
  return dispatch => dispatch(
    hasPollTimeAction({
      hasPollTime: e.target.value === 'true',
    }),
  );
}
/* #endregion */

/* #region Has Answer Time */
export function hasAnswerTimeAction(payload) {
  return {
    type: syncTypes.ANSWER_TIME,
    payload,
  };
}
export function handleHasAnswerTime(e) {
  return dispatch => dispatch(
    hasAnswerTimeAction({
      hasAnswerTime: e.target.value === 'true',
    }),
  );
}
/* #endregion */

/* #region Has Answer Auto Change Time */
export function hasAnswerAutoChangeTimeAction(payload) {
  return {
    type: syncTypes.ANSWER_AUTO_CHANGE_TIME,
    payload,
  };
}
export function handleHasAnswerAutoChangeTime(e) {
  return dispatch => dispatch(
    hasAnswerAutoChangeTimeAction({
      hasAnswerAutoChangeTime: e.target.value === 'true',
    }),
  );
}
/* #endregion */

/* #region Has Answer Percent */
export function hasAnswerPercentAction(payload) {
  return {
    type: syncTypes.ANSWER_PERCENT,
    payload,
  };
}

export function handleHasAnswerPercent(e) {
  return dispatch => dispatch(
    hasAnswerPercentAction({
      hasAnswerPercent: e.target.value === 'true',
    }),
  );
}
/* #endregion */

/* #region Show Type */
export function showTypeAction(payload) {
  return {
    type: syncTypes.SHOW_TYPE,
    payload,
  };
}
export function handleShowType(e) {
  return dispatch => dispatch(
    showTypeAction({
      showType: e.target.value,
    }),
  );
}
/* #endregion */

/* #region Type */
export function typeAction(payload) {
  return {
    type: syncTypes.TYPE,
    payload,
  };
}

export function handleType(e) {
  return dispatch => dispatch(
    typeAction({
      type: e.target.value,
    }),
  );
}
/* #endregion */

/* #region User Data Collect Type */
export function userDataCollectTypeAction(payload) {
  return {
    type: syncTypes.USER_DATA_COLLECT_TYPE,
    payload,
  };
}
export function handleUserDataCollectType(e) {
  return dispatch => dispatch(
    userDataCollectTypeAction({
      userDataCollectType: e.target.value,
    }),
  );
}
/* #endregion */

/* #region Is Poll Active */
export function isPollActiveAction(payload) {
  return {
    type: syncTypes.POLL_ACTIVE,
    payload,
  };
}
export function handleIsPollActive(e) {
  return dispatch => dispatch(
    isPollActiveAction({
      isPollActive: e.target.value,
    }),
  );
}
/* #endregion */

/* #region Poll Time */
export function pollTimeAction(payload) {
  return {
    type: syncTypes.ADD_POLL_TIME,
    payload,
  };
}
export function handlePollTime(value) {
  return dispatch => dispatch(
    pollTimeAction({
      pollTime: value,
    }),
  );
}
/* #endregion */

/* #region Answert Auto Change Time */
export function answerAutoChangeTimeAction(payload) {
  return {
    type: syncTypes.ADD_ANSWER_AUTO_CHANGE_TIME,
    payload,
  };
}
export function handleAnswerAutoChangeTime(value) {
  return dispatch => dispatch(
    answerAutoChangeTimeAction({
      answerAutoChangeTime: value * 1000,
    }),
  );
}
/* #endregion */

/* #region Answer Time */
export function answerTimeAction(payload) {
  return {
    type: syncTypes.ADD_ANSWER_TIME,
    payload,
  };
}
export function handleAnswerTime(value) {
  return dispatch => dispatch(
    answerTimeAction({
      answerTime: value,
    }),
  );
}

/* #endregion */
