
import { syncTypes } from '../../types';

export function hasPollTimeAction(payload) {
  return {
    type: syncTypes.POLL_TIME,
    payload,
  };
}

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

export function handlePollTimeAction(payload) {
  return {
    type: syncTypes.ADD_POLL_TIME,
    payload,
  };
}

export function handleAnswerAutoChangeTimeAction(payload) {
  return {
    type: syncTypes.ADD_ANSWER_AUTO_CHANGE_TIME,
    payload,
  };
}

export function handleAnswerTimeAction(payload) {
  return {
    type: syncTypes.ADD_ANSWER_TIME,
    payload,
  };
}

export function userDataCollectTypeAction(payload) {
  return {
    type: syncTypes.USER_DATA_COLLECT_TYPE,
    payload,
  };
}

export function handleHasPollTime(e) {
  const radioButton = e.target;
  if (radioButton.id === 'hasPollTimeTrue') {
    return dispatch => dispatch(hasPollTimeAction({ hasPollTime: true }));
  }
  return dispatch => dispatch(hasPollTimeAction({ hasPollTime: false }));
}

export function handleHasAnswerTime(e) {
  const radioButton = e.target;
  if (radioButton.id === 'hasAnswerTimeTrue') {
    return dispatch => dispatch(hasAnswerTimeAction({ hasAnswerTime: true }));
  }
  return dispatch => dispatch(hasAnswerTimeAction({ hasAnswerTime: false }));
}

export function handleHasAnswerAutoChangeTime(e) {
  const radioButton = e.target;
  if (radioButton.id === 'hasAnswerAutoChangeTimeTrue') {
    return dispatch => dispatch(hasAnswerAutoChangeTimeAction({ hasAnswerAutoChangeTime: true }));
  }
  return dispatch => dispatch(hasAnswerAutoChangeTimeAction({ hasAnswerAutoChangeTime: false }));
}

export function handleAnswerPercent(e) {
  const radioButton = e.target;
  if (radioButton.id === 'hasAnswerPercentTrue') {
    return dispatch => dispatch(hasAnswerPercentAction({ hasAnswerPercent: true }));
  }
  return dispatch => dispatch(hasAnswerPercentAction({ hasAnswerPercent: false }));
}

export function handleShowType(e) {
  const radioButton = e.target;
  if (radioButton.id === 'showTypeTrue') {
    return dispatch => dispatch(showTypeAction({ showType: 'sideBySide' }));
  }
  return dispatch => dispatch(showTypeAction({ showType: 'full' }));
}

export function handleType(e) {
  const radioButton = e.target;
  if (radioButton.id === 'typeTrue') {
    return dispatch => dispatch(typeAction({ type: 'test' }));
  }
  return dispatch => dispatch(typeAction({ type: 'poll' }));
}

export function handleUserDataCollectType(e) {
  const radioButton = e.target;
  if (radioButton.id === 'userDataCollectTypeTrue') {
    return dispatch => dispatch(userDataCollectTypeAction({ userDataCollectType: 'form' }));
  }
  return dispatch => dispatch(userDataCollectTypeAction({ userDataCollectType: 'anonim' }));
}

export function handleIsPollActive(e) {
  const radioButton = e.target;
  if (radioButton.id === 'isPollActiveTrue') {
    return dispatch => dispatch(isPollActiveAction({ isPollActive: true }));
  }
  return dispatch => dispatch(isPollActiveAction({ isPollActive: false }));
}

export function handlePollTime(value) {
  return dispatch => dispatch(handlePollTimeAction({ pollTime: value }));
}

export function handleAnswerAutoChangeTime(value) {
  return dispatch => dispatch(handleAnswerAutoChangeTimeAction({ answerAutoChangeTime: value * 1000 }));
}

export function handleAnswerTime(value) {
  return dispatch => dispatch(handleAnswerTimeAction({ answerTime: value }));
}
