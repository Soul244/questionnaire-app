import update from 'immutability-helper';
import _ from 'lodash';

import {
  syncTypes
} from '../../types';

/* #region Actions */
export function addAnswerAction(payload) {
  return {
    type: syncTypes.ADD_ANSWER,
    payload,
  };
}

export function deleteAnswerAction(payload) {
  return {
    type: syncTypes.DELETE_ANSWER,
    payload,
  };
}

export function onChangedAnswerAction(payload) {
  return {
    type: syncTypes.ON_CHANGE_ANSWER,
    payload,
  };
}

export function onChangedTypeAnswerAction(payload) {
  return {
    type: syncTypes.ON_CHANGE_TYPE_ANSWER,
    payload,
  };
}
/* #endregion */

/* #region Functions */
export function handleAddAnswer(type, questionOrder) {
  return (dispatch, getState) => {
    const {
      answers
    } = getState().poll;
    const filteredAnswers = answers.filter(answer => answer.questionOrder === questionOrder);
    filteredAnswers.reverse();
    const newAnswer = {
      order: filteredAnswers.length > 0 ? answers[0].order + 1 : 0,
      questionOrder,
      type,
      content: '',
    };
    dispatch(addAnswerAction(({
      answers: [newAnswer, ...answers]
    })));
  };
}

export function handleDeleteAnswer(questionOrder, order) {
  return (dispatch, getState) => {
    const {
      answers
    } = getState().poll;
    _.remove(answers, {
      questionOrder,
      order
    });
    dispatch(deleteAnswerAction(({
      answers
    })));
  };
}

export function handleOnChangeAnswer(content, questionOrder, order) {
  return (dispatch, getState) => {
    const {
      answers
    } = getState().poll;
    const index = answers.findIndex(answer => answer.order === order &&
      answer.questionOrder === questionOrder);
    const updatedAnswer = update(answers[index], {
      content: {
        $set: content
      }
    });
    const newAnswers = update(answers, {
      $splice: [
        [index, 1, updatedAnswer]
      ]
    });
    dispatch(onChangedAnswerAction(({
      newAnswers
    })));
  };
}

export function handleOnChangeTypeAnswer(type, questionOrder, order) {
  return (dispatch, getState) => {
    const {
      answers
    } = getState().poll;
    const index = answers.findIndex(answer => answer.order === order &&
      answer.questionOrder === questionOrder);
    const updatedAnswer = update(answers[index], {
      type: {
        $set: type
      }
    });
    const newAnswers = update(answers, {
      $splice: [
        [index, 1, updatedAnswer]
      ]
    });
    dispatch(onChangedTypeAnswerAction(({
      newAnswers
    })));
  };
}

/* #endregion */