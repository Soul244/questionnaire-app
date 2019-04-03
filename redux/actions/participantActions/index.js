import axios from '../../axios';
import { syncTypes, asyncTypes } from '../../types';

/* #region Add Participant Answer */
export function addParticipantAnswerAction(payload) {
  return {
    type: syncTypes.ADD_PARTICIPANT_ANSWER,
    payload,
  };
}
export function addParticipantAnswer(questionIndex, answerIndex) {
  return (dispatch, getState) => {
    const { questions } = getState().pollReducer.poll;
    const { answers } = questions[questionIndex];
    const userAnswers = getState().participantReducer.answers;
    const newAnswers = [
      ...userAnswers,
      {
        questionId: questions[questionIndex]._id,
        answerId: answers[answerIndex]._id,
        isTrue: answers[answerIndex].isTrue,
      },
    ];
    dispatch(addParticipantAnswerAction(newAnswers));
  };
}
/* #endregion */

/* #region Add Participant Name */
export function addParticipantNameAction(payload) {
  return {
    type: syncTypes.ADD_PARTICIPANT_NAME,
    payload,
  };
}

export function addParticipantName(name) {
  return (dispatch) => {
    dispatch(addParticipantNameAction(name));
  };
}
/* #endregion */

/* #region Add Participant Surname */
export function addParticipantSurnameAction(payload) {
  return {
    type: syncTypes.ADD_PARTICIPANT_SURNAME,
    payload,
  };
}
export function addParticipantSurname(surname) {
  return (dispatch) => {
    dispatch(addParticipantSurnameAction(surname));
  };
}
/* #endregion */

/* #region Add Participant Email */
export function addParticipantEmailAction(payload) {
  return {
    type: syncTypes.ADD_PARTICIPANT_EMAIL,
    payload,
  };
}
export function addParticipantEmail(email) {
  return (dispatch) => {
    dispatch(addParticipantEmailAction(email));
  };
}
/* #endregion */

/* #region Get Participants */
export function getParticipantsAction(payload) {
  return {
    type: asyncTypes.GET_PARTICIPANTS,
    payload,
  };
}

export function getParticipantsErrorAction(payload) {
  return {
    type: asyncTypes.GET_PARTICIPANTS_ERROR,
    payload,
  };
}
export function getParticipants(_id) {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/participants/${_id}`);
      if (response.status === 200)dispatch(getParticipantsAction(response.data.participants));
      else if (response.status === 204)dispatch(getParticipantsErrorAction(response.statusText));
    } catch (error) {
      dispatch(getParticipantsErrorAction(`${error.status} ${error.statusText}`));
    }
  };
}
/* #endregion */

/* #region Post Participant */
export function postParticipantAction(payload) {
  return {
    type: asyncTypes.POST_PARTICIPANT,
    payload,
  };
}

export function postParticipantErrorAction(payload) {
  return {
    type: asyncTypes.POST_PARTICIPANT_ERROR,
    payload,
  };
}

export function postParticipant(participant) {
  return async (dispatch) => {
    try {
      const response = await axios.post('/participants/', {
        name: participant.name,
        surname: participant.surname,
        email: participant.email,
        pollId: participant.pollId,
        answers: participant.answers,
      });
      dispatch(postParticipantAction(response.data));
    } catch (error) {
      dispatch(postParticipantErrorAction(`${error.status} ${error.statusText}`));
    }
  };
}

/* #endregion */
