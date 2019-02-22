import update from 'immutability-helper';
import {
  arrayMove
} from 'react-sortable-hoc';

import {
  syncTypes
} from '../../types';

/* #region Actions */
export function addQuestionAction(payload) {
  return {
    type: syncTypes.ADD_QUESTION,
    payload,
  };
}

export function deleteQuestionAction(payload) {
  return {
    type: syncTypes.DELETE_QUESTION,
    payload,
  };
}

export function updateQuestionOrderAction(payload) {
  return {
    type: syncTypes.UPDATE_QUESTION_ORDER,
    payload,
  };
}

export function onChangeQuestionAction(payload) {
  return {
    type: syncTypes.ON_CHANGE_QUESTION,
    payload,
  };
}

export function onChangeTypeQuestionAction(payload) {
  return {
    type: syncTypes.ON_CHANGE_TYPE_QUESTION,
    payload,
  };
}

export function onClickRightAnswerAction(payload) {
  return {
    type: syncTypes.ON_CLICK_RIGHT_ANSWER,
    payload,
  };
}

export function onChangeQuestionDescAction(payload) {
  return {
    type: syncTypes.ON_CHANGE_QUESTION_DESC,
    payload,
  };
}
/* #endregion */

/* #region Functions */
export function handleAddQuestion(type) {
  return (dispatch, getState) => {
    const {
      questions
    } = getState().poll;
    const newQuestion = {
      order: questions.length,
      type,
      content: '',
      rightAnswerOrder: '',
    };
    dispatch(addQuestionAction({
      questions: [...questions, newQuestion]
    }));
  };
}

export function handleDeleteQuestion(order) {
  return (dispatch, getState) => {
    const {
      questions
    } = getState().poll;
    const newQuestions = questions.filter(question => question.order !== order);
    dispatch(deleteQuestionAction(({
      questions: newQuestions
    })));
  };
}

export function handleUpdateQuestionOrder({
  oldIndex,
  newIndex
}) {
  return (dispatch, getState) => {
    const {
      questions
    } = getState().poll;
    const q = arrayMove(questions, oldIndex, newIndex);
    dispatch(updateQuestionOrderAction(({
      questions: [...q]
    })));
  };
}

export function handleOnChangeQuestion(content, order) {
  return (dispatch, getState) => {
    const {
      questions
    } = getState().poll;
    const index = questions.findIndex(question => question.order === order);
    const updatedQuestion = update(questions[index], {
      content: {
        $set: content
      }
    });
    const newQuestions = update(questions, {
      $splice: [
        [index, 1, updatedQuestion]
      ]
    });
    dispatch(onChangeQuestionAction(({
      newQuestions
    })));
  };
}

export function handleOnChangeTypeQuestion(type, order) {
  return (dispatch, getState) => {
    const {
      questions
    } = getState().poll;
    const index = questions.findIndex(question => question.order === order);
    const updatedQuestion = update(questions[index], {
      type: {
        $set: type
      }
    });
    const newQuestions = update(questions, {
      $splice: [
        [index, 1, updatedQuestion]
      ]
    });
    dispatch(onChangeTypeQuestionAction(({
      newQuestions
    })));
  };
}

export function handleOnChangeQuestionDesc(desc, order) {
  return (dispatch, getState) => {
    const {
      questions
    } = getState().poll;
    const index = questions.findIndex(question => question.order === order);
    const updatedQuestion = update(questions[index], {
      desc: {
        $set: desc
      }
    });
    const newQuestions = update(questions, {
      $splice: [
        [index, 1, updatedQuestion]
      ]
    });
    dispatch(onChangeQuestionDescAction(({
      newQuestions
    })));
  };
}

export function handleOnClickRightAnswer(order, rightAnswerOrder) {
  return (dispatch, getState) => {
    const {
      questions
    } = getState().poll;
    const index = questions.findIndex(question => question.order === order);
    const updatedQuestion = update(questions[index], {
      rightAnswerOrder: {
        $set: rightAnswerOrder
      },
    });
    const newQuestions = update(questions, {
      $splice: [
        [index, 1, updatedQuestion]
      ]
    });
    dispatch(onClickRightAnswerAction(({
      newQuestions
    })));
  };
}
/* #endregion */