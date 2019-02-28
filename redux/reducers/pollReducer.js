/* eslint-disable no-param-reassign */
import { asyncTypes, syncTypes } from '../types';

const initialState = {
  id: '',
  user: '',
  css: '',
  js: '',
  slug: '',
  name: '',
  desc: '',
  lastDesc: 'Anketimize katıldığınız için teşekkür ederiz.',
  selectableLastMessages: [],
  questions: [],
  answers: [],
  settings: {
    hasAnswerAutoChangeTime: false,
    answerAutoChangeTime: '',
    hasAnswerTime: false,
    answerTime: '',
    hasPollTime: false,
    pollTime: '',
    showType: 'sideBySide',
    isPollActive: 'active',
    hasAnswerPercent: false,
    type: 'test',
    userDataCollectType: 'form',
  },
};

const pollReducer = (state = initialState, action) => {
  switch (action.type) {
    case asyncTypes.GET_UPDATE_POLL:
      state = action.payload;
      break;
    case syncTypes.ON_CHANGE_CSS:
      state = {
        ...state,
        css: action.payload,
      };
      break;
    case syncTypes.ON_CHANGE_JS:
      state = {
        ...state,
        js: action.payload,
      };
      break;
    case syncTypes.ON_CHANGE_NAME:
      state = {
        ...state,
        name: action.payload,
      };
      break;
    case syncTypes.ON_CHANGE_DESC:
      state = {
        ...state,
        desc: action.payload,
      };
      break;
    case syncTypes.ON_CHANGE_LAST_DESC:
      state = {
        ...state,
        lastDesc: action.payload,
      };
      break;
    case syncTypes.ON_CHANGE_SLUG:
      state = {
        ...state,
        slug: action.payload,
      };
      break;
    case syncTypes.ANSWER_AUTO_CHANGE_TIME:
      state = {
        ...state,
        settings: {
          ...state.settings,
          hasAnswerAutoChangeTime: action.payload.hasAnswerAutoChangeTime,
        },
      };
      break;
    case syncTypes.ADD_ANSWER_AUTO_CHANGE_TIME:
      state = {
        ...state,
        settings: {
          ...state.settings,
          answerAutoChangeTime: action.payload.answerAutoChangeTime,
        },
      };
      break;
    case syncTypes.ANSWER_TIME:
      state = {
        ...state,
        settings: {
          ...state.settings,
          hasAnswerTime: action.payload.hasAnswerTime,
        },
      };
      break;
    case syncTypes.ADD_ANSWER_TIME:
      state = {
        ...state,
        settings: {
          ...state.settings,
          answerTime: action.payload.answerTime,
        },
      };
      break;
    case syncTypes.POLL_TIME:
      state = {
        ...state,
        settings: {
          ...state.settings,
          hasPollTime: action.payload.hasPollTime,
        },
      };
      break;
    case syncTypes.ADD_POLL_TIME:
      state = {
        ...state,
        settings: {
          ...state.settings,
          pollTime: action.payload.pollTime,
        },
      };
      break;
    case syncTypes.SHOW_TYPE:
      state = {
        ...state,
        settings: {
          ...state.settings,
          showType: action.payload.showType,
        },
      };
      break;
    case syncTypes.TYPE:
      state = {
        ...state,
        settings: {
          ...state.settings,
          type: action.payload.type,
        },
      };
      break;
    case syncTypes.USER_DATA_COLLECT_TYPE:
      state = {
        ...state,
        settings: {
          ...state.settings,
          userDataCollectType: action.payload.userDataCollectType,
        },
      };
      break;
    case syncTypes.POLL_ACTIVE:
      state = {
        ...state,
        settings: {
          ...state.settings,
          isPollActive: action.payload.isPollActive,
        },
      };
      break;
    case syncTypes.ANSWER_PERCENT:
      state = {
        ...state,
        settings: {
          ...state.settings,
          hasAnswerPercent: action.payload.hasAnswerPercent,
        },
      };
      break;
    case syncTypes.ON_CHANGE_SELECTABLE_LAST_MESSAGE:
      state = {
        ...state,
        selectableLastMessages: action.payload.newSelectableLastMessages,
      };
      break;
    case syncTypes.ADD_SELECTABLE_LAST_MESSAGE:
      state = {
        ...state,
        selectableLastMessages: action.payload.selectableLastMessages,
      };
      break;
    case syncTypes.ADD_QUESTION:
      state = {
        ...state,
        questions: action.payload,
      };
      break;
    case syncTypes.DELETE_QUESTION:
      state = {
        ...state,
        questions: action.payload,
      };
      break;
    case syncTypes.UPDATE_QUESTION_ORDER:
      state = {
        ...state,
        questions: action.payload.questions,
      };
      break;
    case syncTypes.ON_CHANGE_QUESTION:
      state = {
        ...state,
        questions: action.payload,
      };
      break;
    case syncTypes.ON_CHANGE_TYPE_QUESTION:
      state = {
        ...state,
        questions: action.payload,
      };
      break;
    case syncTypes.ON_CHANGE_RIGHT_ANSWER:
      state = {
        ...state,
        questions: action.payload,
      };
      break;
    case syncTypes.ON_CHANGE_QUESTION_DESC:
      state = {
        ...state,
        questions: action.payload,
      };
      break;
    case syncTypes.ADD_ANSWER:
      state = {
        ...state,
        answers: action.payload,
      };
      break;
    case syncTypes.DELETE_ANSWER:
      state = {
        ...state,
        answers: action.payload,
      };
      break;
    case syncTypes.ON_CHANGE_ANSWER:
      state = {
        ...state,
        answers: action.payload,
      };
      break;
    case syncTypes.ON_CHANGE_TYPE_ANSWER:
      state = {
        ...state,
        answers: action.payload,
      };
      break;
    default: {
      return state;
    }
  }
  return state;
};

export default pollReducer;
