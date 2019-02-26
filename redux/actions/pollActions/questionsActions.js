import { arrayMove } from 'react-sortable-hoc';
import {List} from 'immutable';
import { syncTypes } from '../../types';

/* #region Add Question IMMUTABLE*/
export function addQuestionAction(payload) {
  return {
    type: syncTypes.ADD_QUESTION,
    payload
  };
}
export function addQuestion(type) {
  return (dispatch, getState) => {
    const { questions } = getState().poll;
    const newQuestion = {      
      order: questions.length > 0 ? questions[questions.length-1].order + 1 : 0,
      type,
      content: '',
      rightAnswerOrder: null
    };
    const newQuestions = List(questions).push(newQuestion).toArray();
    dispatch(
      addQuestionAction(newQuestions)
    );
  };
}
/* #endregion */

/* #region Delete Qeuestion IMMUTABLE */
export function deleteQuestionAction(payload) {
  return {
    type: syncTypes.DELETE_QUESTION,
    payload
  };
}
export function deleteQuestion(order) {
  return (dispatch, getState) => {
    const { questions } = getState().poll;
    const index = questions.findIndex(
      question => question.order === order
    )
    const newQuestions = List(questions).delete(index).toArray();
    dispatch(
      deleteQuestionAction(newQuestions)
    );
  };
}
/* #endregion */

/* #region Update Question Order NOT IN USE FOR NOW*/
export function updateQuestionOrderAction(payload) {
  return {
    type: syncTypes.UPDATE_QUESTION_ORDER,
    payload
  };
}
export function updateQuestionOrder({ oldIndex, newIndex }) {
  return (dispatch, getState) => {
    const { questions } = getState().poll;
    const q = arrayMove(questions, oldIndex, newIndex);
    dispatch(
      updateQuestionOrderAction({
        questions: [...q]
      })
    );
  };
}
/* #endregion */

/* #region On Change Question IMMUTABLE*/
export function onChangeQuestionAction(payload) {
  return {
    type: syncTypes.ON_CHANGE_QUESTION,
    payload
  };
}

export function onChangeQuestion(content, order) {
  return (dispatch, getState) => {
    const { questions } = getState().poll;
    const newQuestions= List(questions).setIn([order, "content"],content).toArray();
    dispatch(
      onChangeQuestionAction(newQuestions)
    );
  };
}
/* #endregion */

/* #region On Change Question Type IMMUTABLE*/
export function onChangeQuestionTypeAction(payload) {
  return {
    type: syncTypes.ON_CHANGE_TYPE_QUESTION,
    payload
  };
}
export function onChangeQuestionType(type, order) {
  return (dispatch, getState) => {
    const { questions } = getState().poll;
    const newQuestions= List(questions).setIn([order, "type"],type).toArray();
    dispatch(
      onChangeQuestionTypeAction(newQuestions)
    );
  };
}
/* #endregion */

/* #region On Change Question Desc IMMUTABLE */
export function onChangeQuestionDescAction(payload) {
  return {
    type: syncTypes.ON_CHANGE_QUESTION_DESC,
    payload
  };
}
export function onChangeQuestionDesc(desc, order) {
  return (dispatch, getState) => {
    const { questions } = getState().poll;
    const newQuestions= List(questions).setIn([order, "desc"],desc).toArray();
    dispatch(
      onChangeQuestionDescAction(newQuestions)
    );
  };
}
/* #endregion */

/* #region On Click Right Answer IMMUTABLE*/
export function onClickRightAnswerAction(payload) {
  return {
    type: syncTypes.ON_CLICK_RIGHT_ANSWER,
    payload
  };
}
export function onClickRightAnswer(order, rightAnswerOrder) {
  return (dispatch, getState) => {
    const { questions } = getState().poll;
    const newQuestions= List(questions).setIn([order, "rightAnswerOrder"],rightAnswerOrder).toArray();
    dispatch(
      onClickRightAnswerAction(newQuestions)
    );
  };
}
/* #endregion */
