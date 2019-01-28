import axios from 'axios';
import {
  GET_POLL, POST_POLL, UPDATE_POLL, DELETE_POLL, GET_POLLS, GET_PREVIEW_POLL,
} from '../../types';

const { apiUrl } = process.env;

export function getPollAction(payload) {
  return {
    type: GET_POLL,
    payload,
  };
}

export function getPreviewAction(payload) {
  return {
    type: GET_PREVIEW_POLL,
    payload,
  };
}

export function postPollAction(payload) {
  return {
    type: POST_POLL,
    payload,
  };
}

export function updatePollAction(payload) {
  return {
    type: UPDATE_POLL,
    payload,
  };
}

export function deletePollAction(payload) {
  return {
    type: DELETE_POLL,
    payload,
  };
}

export function getPollsAction(payload) {
  return {
    type: GET_POLLS,
    payload,
  };
}

export function getPoll(slug) {
  const endPoint = `${apiUrl}polls/${slug}`;
  return async (dispatch) => {
    try {
      const response = await axios.get(endPoint);
      dispatch(getPollAction(response.data.poll));
    } catch (error) {
      throw error;
    }
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

export function postPoll(poll) {
  const endPoint = `${apiUrl}polls`;
  const auth = JSON.parse(localStorage.getItem('auth'));
  axios.defaults.headers.authorization = auth.token;
  return async (dispatch) => {
    try {
      const response = await axios.post(endPoint, {
        id: poll.id,
        userId: auth.id,
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
      throw error;
    }
  };
}

export function updatePoll(poll) {
  const endPoint = `${apiUrl}polls/update`;
  const auth = JSON.parse(localStorage.getItem('auth'));
  axios.defaults.headers.authorization = auth.token;
  return async (dispatch) => {
    try {
      const response = await axios.post(endPoint, {
        _id: poll._id,
        userId: auth.id,
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
      throw error;
    }
  };
}

// AXIOS
export function deletePoll(_id) {
  const endPoint = `${apiUrl}polls/${_id}`;
  const auth = JSON.parse(localStorage.getItem('auth'));
  axios.defaults.headers.authorization = auth.token;
  return async (dispatch, getState) => {
    try {
      const { polls } = getState().polls;
      const newPolls = polls.filter(poll => poll._id !== _id);
      const response = await axios.delete(endPoint, _id);
      const { message } = response.data;
      dispatch(deletePollAction({ newPolls, message }));
    } catch (error) {
      throw error;
    }
  };
}

// AXIOS
export function getPolls(userId) {
  const auth = JSON.parse(localStorage.getItem('auth'));
  const endPoint = `${apiUrl}polls/user/${auth.id}`;
  axios.defaults.headers.authorization = auth.token;
  return async (dispatch) => {
    try {
      const response = await axios.get(endPoint);
      dispatch(getPollsAction(response.data));
    } catch (error) {
      throw error;
    }
  };
}
