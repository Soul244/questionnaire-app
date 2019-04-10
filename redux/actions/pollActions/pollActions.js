import axios from '../../axios';
import { syncTypes, asyncTypes } from '../../types';

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
export function getPoll(_id) {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/polls/${_id}`);
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
    type: asyncTypes.POST_POLL_ERROR,
    payload,
  };
}

export function postPoll(poll) {
  axios.defaults.headers.authorization = localStorage.getItem('token');
  return async (dispatch) => {
    try {
      poll.user = localStorage.getItem('_id');
      const response = await axios.post('/polls', poll);
      dispatch(postPollAction(response.data));
    } catch (error) {
      dispatch(postPollErrorAction(`${error}`));
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
      const response = await axios.patch('/polls', {
        _id: poll._id,
        user: localStorage.getItem('_id'),
        css: poll.css,
        js: poll.js,
        name: poll.name,
        desc: poll.desc,
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
      const { polls } = getState().getState().pollReducer;
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
export function getPollsStartAction() {
  return {
    type: asyncTypes.GET_POLLS_START,
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

export function getPolls(page) {
  axios.defaults.headers.authorization = localStorage.getItem('token');
  return async (dispatch) => {
    try {
      dispatch(getPollsStartAction());
      const response = await axios.get(`/polls/paginate/${page}`);
      dispatch(getPollsAction(response.data));
    } catch (error) {
      dispatch(getPollsErrorAction(error));
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

/* #region On Change Name */
export function onChangeNameAction(payload) {
  return {
    type: syncTypes.ON_CHANGE_NAME,
    payload,
  };
}
export function onChangeName(name) {
  return (dispatch) => {
    dispatch(onChangeNameAction(name));
  };
}
/* #endregion */

/* #region On Change Desc */
export function onChangeDescAction(payload) {
  return {
    type: syncTypes.ON_CHANGE_DESC,
    payload,
  };
}
export function onChangeDesc(desc) {
  return (dispatch) => {
    dispatch(onChangeDescAction(desc));
  };
}
/* #endregion */

/* #region On Change Last Desc */
export function onChangeLastDescAction(payload) {
  return {
    type: syncTypes.ON_CHANGE_LAST_DESC,
    payload,
  };
}
export function onChangeLastDesc(lastDesc) {
  return (dispatch) => {
    dispatch(onChangeLastDescAction(lastDesc));
  };
}

/* #endregion */

/* #region On Change Css */
export function onChangeCssAction(payload) {
  return {
    type: syncTypes.ON_CHANGE_CSS,
    payload,
  };
}
export function onChangeCss(css) {
  return (dispatch) => {
    dispatch(onChangeCssAction(css));
  };
}
/* #endregion */

/* #region On Change JS */
export function onChangeJsAction(payload) {
  return {
    type: syncTypes.ON_CHANGE_JS,
    payload,
  };
}
export function onChangeJs(js) {
  return (dispatch) => {
    dispatch(onChangeJsAction(js));
  };
}
/* #endregion */

/* #region Selectable Last Message */
export function handleSelectableLastMessageChangeAction(payload) {
  return {
    type: syncTypes.ON_CHANGE_SELECTABLE_LAST_MESSAGE,
    payload,
  };
}
export function handleAddSelectableLastMessageAction(payload) {
  return {
    type: syncTypes.ADD_SELECTABLE_LAST_MESSAGE,
    payload,
  };
}
export function handleSelectableLastMessage(type, content) {
  return (dispatch, getState) => {
    const { selectableLastMessages } = getState().pollReducer;
    const index = selectableLastMessages.findIndex(
      message => message.type === type,
    );
    /*

    if (index > -1) {
      const updatedItem = update(selectableLastMessages[index], {
        content: {
          $set: content
        }
      });
      const newSelectableLastMessages = update(selectableLastMessages, {
        $splice: [[index, 1, updatedItem]]
      });
      dispatch(
        handleSelectableLastMessageChangeAction({
          newSelectableLastMessages
        })
      );
    } else {
      dispatch(
        handleAddSelectableLastMessageAction({
          selectableLastMessages: [
            ...selectableLastMessages,
            {
              type,
              content
            }
          ]
        })
      );
    }
*/
  };
}
/* #endregion */
