import {
  List,
} from 'immutable';
import {
  syncTypes,
} from '../../types';

/* #region Add Answer IMMUTABLE */
export function addAnswerAction(payload) {
  return {
    type: syncTypes.ADD_ANSWER,
    payload,
  };
}
export function addAnswer(type, questionIndex) {
  return (dispatch, getState) => {
    const { questions } = getState().pollReducer.poll;
    const { answers } = questions[questionIndex];
    const newAnswer = {
      type,
      count: 0,
      content: '',
    };
    const newAnswers = List(answers).push(newAnswer).toArray();
    const newQuestions = List(questions).setIn([questionIndex, 'answers'], newAnswers).toArray();
    dispatch(
      addAnswerAction(newQuestions),
    );
  };
}
/* #endregion */

/* #region On Changed Answer IMMUTABLE */
export function onChangeAnswerContentAction(payload) {
  return {
    type: syncTypes.ON_CHANGE_ANSWER,
    payload,
  };
}
export function onChangeAnswerContent(content, answerIndex, questionIndex) {
  return (dispatch, getState) => {
    const { questions } = getState().pollReducer.poll;
    const { answers } = questions[questionIndex];
    const newAnswers = List(answers).setIn([answerIndex, 'content'], content).toArray();
    const newQuestions = List(questions).setIn([questionIndex, 'answers'], newAnswers).toArray();
    dispatch(
      onChangeAnswerContentAction(newQuestions),
    );
  };
}
/* #endregion */

/* #region On Changed Type IMMUTABLE */
export function onChangeAnswerTypeAction(payload) {
  return {
    type: syncTypes.ON_CHANGE_TYPE_ANSWER,
    payload,
  };
}
export function onChangeAnswerType(type, answerIndex, questionIndex) {
  return (dispatch, getState) => {
    const { questions } = getState().pollReducer.poll;
    const { answers } = questions[questionIndex];
    const newAnswers = List(answers).setIn([answerIndex, 'type'], type).toArray();
    const newQuestions = List(questions).setIn([questionIndex, 'answers'], newAnswers).toArray();
    dispatch(
      onChangeAnswerTypeAction(newQuestions),
    );
  };
}


/* #region On Click Right Answer IMMUTABLE */
export function onChangeRightAnswerAction(payload) {
  return {
    type: syncTypes.ON_CHANGE_RIGHT_ANSWER,
    payload,
  };
}
export function onChangeRightAnswer(answerIndex, questionIndex) {
  return (dispatch, getState) => {
    const { questions } = getState().pollReducer.poll; // Get Questions
    let newRightAnswerIndex = answerIndex;
    if (questions[questionIndex].rightAnswerIndex === newRightAnswerIndex) {
      newRightAnswerIndex = null;
    }
    const newQuestions = List(questions).setIn([questionIndex, 'rightAnswerIndex'], newRightAnswerIndex).toArray();
    dispatch(
      onChangeRightAnswerAction(newQuestions),
    );
  };
}
/* #endregion */

/* #region Delete Answer IMMUTABLE */
export function deleteAnswerAction(payload) {
  return {
    type: syncTypes.DELETE_ANSWER,
    payload,
  };
}
export function deleteAnswer(answerIndex, questionIndex) {
  return (dispatch, getState) => {
    const { questions } = getState().pollReducer.poll;
    const { answers } = questions[questionIndex];
    const newAnswers = List(answers).delete(answerIndex).toArray();
    const newQuestions = List(questions).setIn([questionIndex, 'answers'], newAnswers).toArray();
    dispatch(
      deleteAnswerAction(newQuestions),
    );
  };
}
/* #endregion */
