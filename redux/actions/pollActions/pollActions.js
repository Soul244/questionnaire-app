import axios from 'axios';
import update from 'immutability-helper';
import { syncTypes, asyncTypes } from '../../types';

const { apiUrl } = process.env;

export function getUpdatePollAction(payload) {
  return {
    type: asyncTypes.GET_UPDATE_POLL,
    payload,
  };
}

export function handleNameOnChangeAction(payload) {
  return {
    type: syncTypes.ON_CHANGE_NAME,
    payload,
  };
}

export function handleDescOnChangeAction(payload) {
  return {
    type: syncTypes.ON_CHANGE_DESC,
    payload,
  };
}

export function handleSlugOnChangeAction(payload) {
  return {
    type: syncTypes.ON_CHANGE_SLUG,
    payload,
  };
}

export function handleLastDescOnChangeAction(payload) {
  return {
    type: syncTypes.ON_CHANGE_LAST_DESC,
    payload,
  };
}

export function handleCssOnChangeAction(payload) {
  return {
    type: syncTypes.ON_CHANGE_CSS,
    payload,
  };
}

export function handleJsOnChangeAction(payload) {
  return {
    type: syncTypes.ON_CHANGE_JS,
    payload,
  };
}

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

export function getUpdatePoll(slug) {
  const endPoint = `${apiUrl}polls/${slug}`;
  return async (dispatch) => {
    try {
      const response = await axios.get(endPoint);
      dispatch(getUpdatePollAction(response.data.poll));
    } catch (error) {
      throw error;
    }
  };
}

export function handleNameOnChange(name) {
  return (dispatch) => {
    dispatch(handleNameOnChangeAction(name));
  };
}

export function handleDescOnChange(desc) {
  return (dispatch) => {
    dispatch(handleDescOnChangeAction(desc));
  };
}

export function handleSlugOnChange(slug) {
  return (dispatch) => {
    dispatch(handleSlugOnChangeAction(slug));
  };
}

export function handleLastDescOnChange(lastDesc) {
  return (dispatch) => {
    dispatch(handleLastDescOnChangeAction(lastDesc));
  };
}

export function handleCssOnChange(css) {
  return (dispatch) => {
    dispatch(handleCssOnChangeAction(css));
  };
}

export function handleJsOnChange(js) {
  return (dispatch) => {
    dispatch(handleJsOnChangeAction(js));
  };
}
/*
export function handleSelectAbleLastMessage(type, content) {
  return (dispatch) => {
    dispatch(handleSelectAbleLastMessageAction());
  };
} */

export function handleSelectableLastMessage(type, content) {
  return (dispatch, getState) => {
    const { selectableLastMessages } = getState().poll;
    const index = selectableLastMessages.findIndex(message => message.type === type);
    if (index > -1) {
      const updatedItem = update(selectableLastMessages[index], {
        content: { $set: content },
      });
      const newSelectableLastMessages = update(selectableLastMessages, {
        $splice:
        [[index, 1, updatedItem]],
      });
      dispatch(handleSelectableLastMessageChangeAction(({ newSelectableLastMessages })));
    } else {
      dispatch(handleAddSelectableLastMessageAction({ selectableLastMessages: [...selectableLastMessages, { type, content }] }));
    }
  };
}
