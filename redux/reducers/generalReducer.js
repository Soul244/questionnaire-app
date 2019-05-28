/* eslint-disable no-param-reassign */
import { syncTypes } from '../types';
import tr from '~translations/tr';


const initialState = {
  locale: 'tr',
  messages: tr,
};

const participantReducer = (state = initialState, action) => {
  switch (action.type) {
    case syncTypes.CHANGE_LANGUAGE:
      state = {
        locale: action.payload.locale,
        messages: action.payload.messages,
      };
      break;
    default: {
      return state;
    }
  }
  return state;
};

export default participantReducer;
