import axios from '../../axios';
import {
  asyncTypes
} from '../../types';

/* #region Actions */
/* #region Get Poll */
export function getPollAction(payload) {
  return {
    type: asyncTypes.GET_POLL,
    payload
  };
}

export function getPollErrorAction(payload) {
  return {
    type: asyncTypes.getAllPollsErrorAction,
    payload
  }
}
/* #endregion */
/* #region Post Poll */
export function postPollAction(payload) {
  return {
    type: asyncTypes.POST_POLL,
    payload
  };
}

export function postPollErrorAction(payload) {
  return {
    type: asyncTypes.UPDATE_POLL_ERROR,
    payload
  }
}
/* #endregion */
/* #region Update Poll */
export function updatePollAction(payload) {
  return {
    type: asyncTypes.UPDATE_POLL,
    payload
  };
}

export function updatePollErrorAction(payload) {
  return {
    type: asyncTypes.UPDATE_POLL_ERROR,
    payload
  };
}
/* #endregion */
/* #region Delete Poll */
export function deletePollAction(payload) {
  return {
    type: asyncTypes.DELETE_POLL,
    payload
  };
}
export function deleteErrorAction(payload) {
  return {
    type: asyncTypes.DELETE_POLL_ERROR,
    payload
  };
}
/* #endregion */
/* #region Get User Polls */
export function getPollsStartAction(payload) {
  return {
    type: asyncTypes.GET_POLLS_START,
    payload
  };
}

export function getPollsAction(payload) {
  return {
    type: asyncTypes.GET_POLLS,
    payload
  };
}

export function getPollsErrorAction(payload) {
  return {
    type: asyncTypes.GET_ALL_POLLS_ERROR,
    payload
  };
}
/* #endregion */
/* #region Get All Polls */
export function getAllPollsAction(payload) {
  return {
    type: asyncTypes.GET_ALL_POLLS,
    payload
  };
}

export function getAllPollsStartAction() {
  return {
    type: asyncTypes.GET_ALL_POLLS_START
  };
}

export function getAllPollsErrorAction(payload) {
  return {
    type: asyncTypes.GET_ALL_POLLS_ERROR,
    payload
  };
}
/* #endregion */
export function getPreviewAction(payload) {
  return {
    type: asyncTypes.GET_PREVIEW_POLL,
    payload
  };
}
/* #endregion */

/* #region Functions */
export function getPoll(slug) {
  return async dispatch => {
    try {
      const response = await axios.get(`/polls/${slug}`);
      dispatch(getPollAction(response.data.poll));
    } catch (error) {
      throw error;
    }
  };
}

export function getPreview(poll) {
  return async dispatch => {
    try {
      dispatch(getPreviewAction(poll));
    } catch (error) {
      throw error;
    }
  };
}

export function postPoll(poll) {
  axios.defaults.headers.authorization = localStorage.getItem('token');
  return async dispatch => {
    try {
      const response = await axios.post(`/polls`, {
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
        selectableLastMessages: poll.selectableLastMessages
      });
      dispatch(postPollAction(response.data));
    } catch (error) {
      throw error;
    }
  };
}

export function updatePoll(poll) {
  axios.defaults.headers.authorization = localStorage.getItem('token');
  return async dispatch => {
    try {
      const response = await axios.post(`/polls/update`, {
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
        selectableLastMessages: poll.selectableLastMessages
      });
      dispatch(updatePollAction(response.data));
    } catch (error) {
      throw error;
    }
  };
}

export function deletePoll(_id) {
  axios.defaults.headers.authorization = localStorage.getItem('token');
  return async (dispatch, getState) => {
    try {
      const {
        polls
      } = getState().polls;
      const newPolls = polls.filter(poll => poll._id !== _id);
      const response = await axios.delete(`/polls/${_id}`, _id);
      const {
        message
      } = response.data;
      dispatch(deletePollAction({
        newPolls,
        message
      }));
    } catch (error) {
      throw error;
    }
  };
}

export function getPolls() {
  axios.defaults.headers.authorization = localStorage.getItem('token');
  return async dispatch => {
    try {
      dispatch(getPollsStartAction());
      const response = await axios.get(`/polls/user/${localStorage.getItem('_id')}`);
      dispatch(getPollsAction(response.data));
    } catch (error) {
      dispatch(getPollsErrorAction(error));
      throw error;
    }
  };
}

export function getAllPolls(page) {
  return async dispatch => {
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