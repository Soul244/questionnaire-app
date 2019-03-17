import axios from '../../axios';
import { syncTypes, asyncTypes } from '../../types';

/* #region Get Update Poll */
export function getUpdatePollAction(payload) {
  return {
    type: asyncTypes.GET_UPDATE_POLL,
    payload,
  };
}

export function getUpdatePoll(_id) {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/polls/${_id}`);
      dispatch(getUpdatePollAction(response.data.poll));
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
    const { selectableLastMessages } = getState().poll;
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
