import axios from '../../axios';
import { syncTypes, asyncTypes } from '../../types';

/* #region Add Participant Answer */
export function addParticipantAnswerAction(payload) {
  return {
    type: syncTypes.ADD_PARTICIPANT_ANSWER,
    payload
  };
}
export function addParticipantAnswer(questionIndex, index, rightAnswerIndex) {
  return (dispatch, getState) => {
    const { answers } = getState().participant;
    let hasRightAnswer = false;
    let isTrue = false;
    if (rightAnswerIndex !== null) {
      if (index === rightAnswerIndex) {
        hasRightAnswer = true;
        isTrue = true;
      } else {
        hasRightAnswer = true;
        isTrue = false;
      }
    }
    const newAnswers = [
      ...answers,
      {
        questionIndex,
        index,
        hasRightAnswer,
        isTrue
      }
    ];
    dispatch(addParticipantAnswerAction(newAnswers));
  };
}
/* #endregion */

/* #region Add Participant Name */
export function addParticipantNameAction(payload) {
  return {
    type: syncTypes.ADD_PARTICIPANT_NAME,
    payload
  };
}

export function addParticipantName(name) {
  return dispatch => {
    dispatch(addParticipantNameAction(name));
  };
}
/* #endregion */

/* #region Add Participant Surname */
export function addParticipantSurnameAction(payload) {
  return {
    type: syncTypes.ADD_PARTICIPANT_SURNAME,
    payload
  };
}
export function addParticipantSurname(surname) {
  return dispatch => {
    dispatch(addParticipantSurnameAction(surname));
  };
}
/* #endregion */

/* #region Add Participant Email */
export function addParticipantEmailAction(payload) {
  return {
    type: syncTypes.ADD_PARTICIPANT_EMAIL,
    payload
  };
}
export function addParticipantEmail(email) {
  return dispatch => {
    dispatch(addParticipantEmailAction(email));
  };
}
/* #endregion */

/* #region Get Participants */
export function getParticipantsAction(payload) {
  return {
    type: asyncTypes.GET_PARTICIPANTS,
    payload
  };
}
export function getParticipants(slug) {
  return async dispatch => {
    try {
      const response = await axios.get(`/participants/${slug}`);
      dispatch(getParticipantsAction(response.data.participants));
    } catch (error) {
      throw error;
    }
  };
}
/* #endregion */

/* #region Post Participant */
export function postParticipantAction(payload) {
  return {
    type: asyncTypes.POST_PARTICIPANT,
    payload
  };
}
export function postParticipant(participant) {
  return async dispatch => {
    try {
      const response = await axios.post(`/participants/`, {
        name: participant.name,
        surname: participant.surname,
        email: participant.email,
        pollId: participant.pollId,
        answers: participant.answers
      });
      dispatch(postParticipantAction(response.data));
    } catch (error) {
      throw error;
    }
  };
}

/* #endregion */
