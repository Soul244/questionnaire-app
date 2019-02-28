import { arrayMove } from 'react-sortable-hoc';
import { List } from 'immutable';
import { syncTypes } from '../../types';

/* #region Add Question IMMUTABLE */
export function addQuestionAction(payload) {
  return {
    type: syncTypes.ADD_QUESTION,
    payload,
  };
}
export function addQuestion(type) {
  return (dispatch, getState) => {
    const { questions } = getState().poll;
    const newQuestion = {
      index: questions.length > 0 ? questions[questions.length - 1].index + 1 : 0,
      type,
      content: '',
      rightAnswerIndex: null,
      desc: '',
    };
    const newQuestions = List(questions).push(newQuestion).toArray();
    dispatch(
      addQuestionAction(newQuestions),
    );
  };
}
/* #endregion */

/* #region Delete Qeuestion IMMUTABLE */
export function deleteQuestionAction(payload) {
  return {
    type: syncTypes.DELETE_QUESTION,
    payload,
  };
}
export function deleteQuestion(index) {
  return (dispatch, getState) => {
    const { questions } = getState().poll;
    const newQuestions = List(questions).delete(index).toArray();
    dispatch(
      deleteQuestionAction(newQuestions),
    );
  };
}
/* #endregion */

/* #region Update Question Order NOT IN USE FOR NOW */
export function updatequestionIndexAction(payload) {
  return {
    type: syncTypes.UPDATE_QUESTION_ORDER,
    payload,
  };
}
export function updatequestionIndex({ oldIndex, newIndex }) {
  return (dispatch, getState) => {
    const { questions } = getState().poll;
    const q = arrayMove(questions, oldIndex, newIndex);
    dispatch(
      updatequestionIndexAction({
        questions: [...q],
      }),
    );
  };
}
/* #endregion */

/* #region On Change Question IMMUTABLE */
export function onChangeQuestionAction(payload) {
  return {
    type: syncTypes.ON_CHANGE_QUESTION,
    payload,
  };
}

export function onChangeQuestionContent(content, index) {
  return (dispatch, getState) => {
    const { questions } = getState().poll;
    const newQuestions = List(questions).setIn([index, 'content'], content).toArray();
    dispatch(
      onChangeQuestionAction(newQuestions),
    );
  };
}
/* #endregion */

/* #region On Change Question Type IMMUTABLE */
export function onChangeQuestionTypeAction(payload) {
  return {
    type: syncTypes.ON_CHANGE_TYPE_QUESTION,
    payload,
  };
}
export function onChangeQuestionType(type, index) {
  return (dispatch, getState) => {
    const { questions } = getState().poll;
    const newQuestions = List(questions).setIn([index, 'type'], type).toArray();
    dispatch(
      onChangeQuestionTypeAction(newQuestions),
    );
  };
}
/* #endregion */

/* #region On Change Question Desc IMMUTABLE */
export function onChangeQuestionDescAction(payload) {
  return {
    type: syncTypes.ON_CHANGE_QUESTION_DESC,
    payload,
  };
}
export function onChangeQuestionDesc(desc, index) {
  return (dispatch, getState) => {
    const { questions } = getState().poll;
    const newQuestions = List(questions).setIn([index, 'desc'], desc).toArray();
    dispatch(
      onChangeQuestionDescAction(newQuestions),
    );
  };
}
/* #endregion */
