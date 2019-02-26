import { List } from 'immutable';
import { syncTypes } from '../../types';

/* #region Add Answer IMMUTABLE*/
export function addAnswerAction(payload) {
  return {
    type: syncTypes.ADD_ANSWER,
    payload
  };
}
export function addAnswer(type, questionOrder) {
  return (dispatch, getState) => {
    const { answers } = getState().poll;
    const filteredAnswers = answers.filter(
      answer => answer.questionOrder === questionOrder
    );
    const newAnswer = {
      order: filteredAnswers.length > 0 ? filteredAnswers[filteredAnswers.length-1].order + 1 : 0,
      questionOrder,
      type,
      count: 0,
      content: ''
    };
    const newAnswers = List(answers).push(newAnswer).toArray();
    dispatch(
      addAnswerAction(newAnswers)
    );
  };
}
/* #endregion */

/* #region Delete Answer IMMUTABLE*/
export function deleteAnswerAction(payload) {
  return {
    type: syncTypes.DELETE_ANSWER,
    payload
  };
}
export function deleteAnswer(questionOrder, order) {
  return (dispatch, getState) => {
    const { answers } = getState().poll;
    const index = answers.findIndex(
      answer => answer.order === order && answer.questionOrder === questionOrder
    )
    const newAnswers = List(answers).delete(index).toArray();
    dispatch(
      deleteAnswerAction(newAnswers)
    );
  };
}
/* #endregion */

/* #region On Changed Answer IMMUTABLE*/
export function onChangeAnswerAction(payload) {
  return {
    type: syncTypes.ON_CHANGE_ANSWER,
    payload
  };
}
export function onChangeAnswer(content, questionOrder, order) {
  return (dispatch, getState) => {
    const { answers } = getState().poll;
    const index = answers.findIndex(
      answer => answer.order === order && answer.questionOrder === questionOrder
    )
    const newAnswers= List(answers).setIn([index, "content"],content).toArray();
    dispatch(
      onChangeAnswerAction(newAnswers)
    );
  };
}
/* #endregion */

/* #region On Changed Type IMMUTABLE */
export function onChangeAnswerTypeAction(payload) {
  return {
    type: syncTypes.ON_CHANGE_TYPE_ANSWER,
    payload
  };
}
export function onChangeAnswerType(type, questionOrder, order) {
  return (dispatch, getState) => {
    const { answers } = getState().poll;
    const index = answers.findIndex(
      answer => answer.order === order && answer.questionOrder === questionOrder
    )
    const newAnswers= List(answers).setIn([index, "type"],type).toArray();
    dispatch(
      onChangeAnswerTypeAction(newAnswers)
    );
  };
}
/* #endregion */
