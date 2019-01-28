import axios from 'axios';
import _ from 'lodash';

import {
  GET_PARTICIPANTS, POST_PARTICIPANT, DELETE_PARTICIPANT,
  ADD_PARTICIPANT_ANSWER, ADD_PARTICIPANT_NAME, ADD_PARTICIPANT_SURNAME, ADD_PARTICIPANT_EMAIL,
} from '../../types';

const { apiUrl } = process.env;

export function addParticipantAnswerAction(payload) {
  return {
    type: ADD_PARTICIPANT_ANSWER,
    payload,
  };
}

export function addParticipantNameAction(payload) {
  return {
    type: ADD_PARTICIPANT_NAME,
    payload,
  };
}

export function addParticipantSurnameAction(payload) {
  return {
    type: ADD_PARTICIPANT_SURNAME,
    payload,
  };
}

export function addParticipantEmailAction(payload) {
  return {
    type: ADD_PARTICIPANT_EMAIL,
    payload,
  };
}


export function getParticipantsAction(payload) {
  return {
    type: GET_PARTICIPANTS,
    payload,
  };
}

export function postParticipantAction(payload) {
  return {
    type: POST_PARTICIPANT,
    payload,
  };
}

export function deleteParticipantAction(payload) {
  return {
    type: DELETE_PARTICIPANT,
    payload,
  };
}

// FORM VALUES
export function addParticipantAnswer(questionOrder, order, rightAnswerOrder) {
  return (dispatch, getState) => {
    const { answers } = getState().participant;
    if (rightAnswerOrder !== null) {
      if (order === rightAnswerOrder) {
        const newAnswers = [...answers, {
          questionOrder, order, hasRightAnswer: true, isTrue: true,
        }];
        dispatch(addParticipantAnswerAction(newAnswers));
      } else {
        const newAnswers = [...answers, {
          questionOrder, order, hasRightAnswer: true, isTrue: false,
        }];
        dispatch(addParticipantAnswerAction(newAnswers));
      }
    } else {
      const newAnswers = [...answers, {
        questionOrder, order, hasRightAnswer: false, isTrue: false,
      }];
      dispatch(addParticipantAnswerAction(newAnswers));
    }
  };
}

export function addParticipantName(name) {
  return (dispatch) => {
    dispatch(addParticipantNameAction(name));
  };
}

export function addParticipantSurname(surname) {
  return (dispatch) => {
    dispatch(addParticipantSurnameAction(surname));
  };
}

export function addParticipantEmail(email) {
  return (dispatch) => {
    dispatch(addParticipantEmailAction(email));
  };
}


export function getParticipants(slug) {
  const endPoint = `${apiUrl}participants/${slug}`;
  return async (dispatch) => {
    try {
      const response = await axios.get(endPoint);
      dispatch(getParticipantsAction(response.data.participants));
    } catch (error) {
      throw error;
    }
  };
}

export function postParticipant(participant) {
  const endPoint = `${apiUrl}participants/`;
  return async (dispatch) => {
    try {
      const response = await axios.post(endPoint, {
        name: participant.name,
        surname: participant.surname,
        email: participant.email,
        pollId: participant.pollId,
        answers: participant.answers,
      });
      dispatch(postParticipantAction(response.data));
    } catch (error) {
      throw error;
    }
  };
}

/*
export function deleteParticipant(id) {
  return (dispatch) => {
    dispatch(deleteParticipantAction(user));
  };
} */
