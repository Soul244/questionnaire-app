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
    const {
      answers,
    } = getState().poll;
    const filteredAnswers = answers.filter(answer => answer.questionIndex === questionIndex);
    const newAnswer = {
      index: filteredAnswers.length > 0 ? filteredAnswers[filteredAnswers.length - 1].index + 1 : 0,
      questionIndex,
      type,
      count: 0,
      content: '',
    };
    const newAnswers = List(answers).push(newAnswer).toArray();
    dispatch(
      addAnswerAction(newAnswers),
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
export function onChangeAnswerContent(content, index) {
  return (dispatch, getState) => {
    const {
      answers,
    } = getState().poll;
    const newAnswers = List(answers).setIn([index, 'content'], content).toArray();
    dispatch(
      onChangeAnswerContentAction(newAnswers),
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
export function onChangeAnswerType(type, index) {
  return (dispatch, getState) => {
    const {
      answers,
    } = getState().poll;
    const newAnswers = List(answers).setIn([index, 'type'], type).toArray();
    dispatch(
      onChangeAnswerTypeAction(newAnswers),
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
export function onChangeRightAnswer(questionIndex, answerIndex) {
  return (dispatch, getState) => {
    let newQuestions;
    const { questions } = getState().poll;
    const question = questions[questionIndex];
    if (question.rightAnswerIndex === answerIndex) {
      newQuestions = List(questions).setIn([questionIndex, 'rightAnswerIndex'], null).toArray();
    } else {
      newQuestions = List(questions).setIn([questionIndex, 'rightAnswerIndex'], answerIndex).toArray();
    }
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
export function deleteAnswer(questionIndex, index) {
  return (dispatch, getState) => {
    const { answers, questions } = getState().poll;
    const newAnswers = List(answers).delete(index).toArray();
    dispatch(
      deleteAnswerAction(newAnswers),
    );
    // Change RightAnswerIndex
    const question = questions[questionIndex];
    let newRightAnswerIndex;
    if (question.rightAnswerIndex > index) {
      newRightAnswerIndex = question.rightAnswerIndex - 1;
    } else if (question.rightAnswerIndex === index) {
      newRightAnswerIndex = null;
    }
    if (newRightAnswerIndex !== undefined) {
      const newQuestions = List(questions).setIn([questionIndex, 'rightAnswerIndex'], newRightAnswerIndex).toArray();
      dispatch(
        onChangeRightAnswerAction(newQuestions),
      );
    }
  };
}
/* #endregion */
