import axios from '../../axios';
import {
  syncTypes,
  asyncTypes
} from '../../types';

/* #region Actions */
export function addParticipantAnswerAction(payload) {
  return {
    type: syncTypes.ADD_PARTICIPANT_ANSWER,
    payload,
  };
}

export function addParticipantNameAction(payload) {
  return {
    type: syncTypes.ADD_PARTICIPANT_NAME,
    payload,
  };
}

export function addParticipantSurnameAction(payload) {
  return {
    type: syncTypes.ADD_PARTICIPANT_SURNAME,
    payload,
  };
}

export function addParticipantEmailAction(payload) {
  return {
    type: syncTypes.ADD_PARTICIPANT_EMAIL,
    payload,
  };
}


export function getParticipantsAction(payload) {
  return {
    type: asyncTypes.GET_PARTICIPANTS,
    payload,
  };
}

export function postParticipantAction(payload) {
  return {
    type: asyncTypes.POST_PARTICIPANT,
    payload,
  };
}

export function deleteParticipantAction(payload) {
  return {
    type: asyncTypes.DELETE_PARTICIPANT,
    payload,
  };
}
/* #endregion */

/* #region Functions */
export function addParticipantAnswer(questionOrder, order, rightAnswerOrder) {
  return (dispatch, getState) => {
    const {
      answers
    } = getState().participant;
    if (rightAnswerOrder !== null) {
      if (order === rightAnswerOrder) {
        const newAnswers = [...answers, {
          questionOrder,
          order,
          hasRightAnswer: true,
          isTrue: true,
        }];
        dispatch(addParticipantAnswerAction(newAnswers));
      } else {
        const newAnswers = [...answers, {
          questionOrder,
          order,
          hasRightAnswer: true,
          isTrue: false,
        }];
        dispatch(addParticipantAnswerAction(newAnswers));
      }
    } else {
      const newAnswers = [...answers, {
        questionOrder,
        order,
        hasRightAnswer: false,
        isTrue: false,
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
  return async (dispatch) => {
    try {
      const response = await axios.get(`/participants/${slug}`);
      dispatch(getParticipantsAction(response.data.participants));
    } catch (error) {
      throw error;
    }
  };
}

export function postParticipant(participant) {
  return async (dispatch) => {
    try {
      const response = await axios.post(`/participants/`, {
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

/* #endregion */