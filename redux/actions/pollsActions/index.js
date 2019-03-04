import axios from '../../axios';
import { asyncTypes, syncTypes } from '../../types';

/* #region Get Poll */
export function getPollAction(payload) {
  return {
    type: asyncTypes.GET_POLL,
    payload,
  };
}

export function getPollErrorAction(payload) {
  return {
    type: asyncTypes.GET_POLL_ERROR,
    payload,
  };
}
export function getPoll(slug) {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/polls/${slug}`);
      dispatch(getPollAction(response.data.poll));
    } catch (error) {
      dispatch(getPollErrorAction(error));
    }
  };
}
/* #endregion */

/* #region Post Poll */
export function postPollAction(payload) {
  return {
    type: asyncTypes.POST_POLL,
    payload,
  };
}

export function postPollErrorAction(payload) {
  return {
    type: asyncTypes.UPDATE_POLL_ERROR,
    payload,
  };
}

export function postPoll(poll) {
  axios.defaults.headers.authorization = localStorage.getItem('token');
  return async (dispatch) => {
    try {
      const response = await axios.post('/polls', {
        user: localStorage.getItem('_id'),
        css: poll.css,
        js: poll.js,
        name: poll.name,
        desc: poll.desc,
        slug: poll.slug,
        lastDesc: poll.lastDesc,
        questions: poll.questions,
        answers: poll.answers,
        settings: poll.settings,
        selectableLastMessages: poll.selectableLastMessages,
      });
      dispatch(postPollAction(response.data));
    } catch (error) {
      dispatch(postPollErrorAction(error));
    }
  };
}
/* #endregion */

/* #region Update Poll */
export function updatePollAction(payload) {
  return {
    type: asyncTypes.UPDATE_POLL,
    payload,
  };
}

export function updatePollErrorAction(payload) {
  return {
    type: asyncTypes.UPDATE_POLL_ERROR,
    payload,
  };
}

export function updatePoll(poll) {
  axios.defaults.headers.authorization = localStorage.getItem('token');
  return async (dispatch) => {
    try {
      const response = await axios.post('/polls/update', {
        _id: poll._id,
        user: localStorage.getItem('_id'),
        css: poll.css,
        js: poll.js,
        name: poll.name,
        desc: poll.desc,
        slug: poll.slug,
        lastDesc: poll.lastDesc,
        questions: poll.questions,
        answers: poll.answers,
        settings: poll.settings,
        selectableLastMessages: poll.selectableLastMessages,
      });
      dispatch(updatePollAction(response.data));
    } catch (error) {
      dispatch(updatePollErrorAction(error));
    }
  };
}
/* #endregion */

/* #region Delete Poll */
export function deletePollAction(payload) {
  return {
    type: asyncTypes.DELETE_POLL,
    payload,
  };
}

export function deletePollErrorAction(payload) {
  return {
    type: asyncTypes.DELETE_POLL_ERROR,
    payload,
  };
}

export function deletePoll(_id) {
  axios.defaults.headers.authorization = localStorage.getItem('token');
  return async (dispatch, getState) => {
    try {
      const { polls } = getState().polls;
      const newPolls = polls.filter(poll => poll._id !== _id);
      const response = await axios.delete(`/polls/${_id}`, _id);
      const { message } = response.data;
      dispatch(
        deletePollAction({
          newPolls,
          message,
        }),
      );
    } catch (error) {
      dispatch(deletePollErrorAction(error));
    }
  };
}
/* #endregion */

/* #region Get User Polls */
export function getPollsStartAction(payload) {
  return {
    type: asyncTypes.GET_POLLS_START,
    payload,
  };
}

export function getPollsAction(payload) {
  return {
    type: asyncTypes.GET_POLLS,
    payload,
  };
}

export function getPollsErrorAction(payload) {
  return {
    type: asyncTypes.GET_POLLS_ERROR,
    payload,
  };
}

export function getPolls() {
  axios.defaults.headers.authorization = localStorage.getItem('token');
  const endPoint = '/polls';
  return async (dispatch) => {
    try {
      dispatch(getPollsStartAction());
      console.log(endPoint);
      const response = await axios.get(
        endPoint,
      );
      dispatch(getPollsAction(response.data));
    } catch (error) {
      dispatch(getPollsErrorAction(error));
    }
  };
}
/* #endregion */

/* #region Get All Polls */
export function getAllPollsStartAction() {
  return {
    type: asyncTypes.GET_ALL_POLLS_START,
  };
}

export function getAllPollsAction(payload) {
  return {
    type: asyncTypes.GET_ALL_POLLS,
    payload,
  };
}

export function getAllPollsErrorAction(payload) {
  return {
    type: asyncTypes.GET_ALL_POLLS_ERROR,
    payload,
  };
}

export function getAllPolls(page) {
  return async (dispatch) => {
    try {
      dispatch(getAllPollsStartAction());
      const response = await axios.get(`/polls/all/${page}`);
      dispatch(getAllPollsAction(response.data));
    } catch (error) {
      dispatch(getAllPollsErrorAction(error));
    }
  };
}
/* #endregion */

/* #region Get Preview */
export function getPreviewAction(payload) {
  return {
    type: syncTypes.GET_PREVIEW_POLL,
    payload,
  };
}

export function getPreview(poll) {
  return async (dispatch) => {
    try {
      dispatch(getPreviewAction(poll));
    } catch (error) {
      throw error;
    }
  };
}
/* #endregion */
