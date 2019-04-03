/* eslint-disable no-param-reassign */
import { asyncTypes, syncTypes } from '../types';

const initialState = {
  poll: {
    id: '',
    user: '',
    css: '',
    js: '',
    name: '',
    desc: '',
    lastDesc: 'Anketimize katıldığınız için teşekkür ederiz.',
    selectableLastMessages: [],
    questions: [{
      type: 'text',
      content: '',
      desc: '',
      count: 0,
      rightAnswerIndex: null,
      answers: [{
        type: 'text',
        content: '',
        desc: '',
        count: 0,
      }],
    }],
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
  },
  polls: [],
  message: '',
  fetching: false,
  fetched: false,
  error: null,
};

const pollReducer = (state = initialState, action) => {
  switch (action.type) {
    case asyncTypes.GET_POLLS:
      state = {
        ...state,
        polls: action.payload.polls,
        message: action.payload.message,
        fetching: false,
        fethed: true,
      };
      break;
    case asyncTypes.GET_POLLS_START:
      state = {
        ...state,
        fetching: true,
      };
      break;
    case asyncTypes.GET_POLLS_ERROR:
      state = {
        ...state,
        error: action.payload.error,
      };
      break;
    case asyncTypes.GET_POLL:
      state = {
        ...state,
        poll: action.payload,
      };
      break;
    case asyncTypes.GET_UPDATE_POLL:
      state = {
        ...state,
        poll: action.payload,
      };
      break;
    case syncTypes.GET_PREVIEW_POLL:
      state = {
        ...state,
        poll: action.payload,
      };
      break;
    case asyncTypes.POST_POLL:
      state = {
        ...state,
        message: action.payload.message,
      };
      break;
    case asyncTypes.UPDATE_POLL:
      state = {
        ...state,
        message: action.payload.message,
      };
      break;
    case asyncTypes.DELETE_POLL:
      state = {
        ...state,
        polls: action.payload.newPolls,
        message: action.payload.message,
      };
      break;
    case syncTypes.ON_CHANGE_CSS:
      state = {
        ...state,
        poll: {
          ...state.poll,
          css: action.payload,
        },
      };
      break;
    case syncTypes.ON_CHANGE_JS:
      state = {
        ...state,
        poll: {
          ...state.poll,
          js: action.payload,
        },
      };
      break;
    case syncTypes.ON_CHANGE_NAME:
      state = {
        ...state,
        poll: {
          ...state.poll,
          name: action.payload,
        },
      };
      break;
    case syncTypes.ON_CHANGE_DESC:
      state = {
        ...state,
        poll: {
          ...state.poll,
          desc: action.payload,
        },
      };
      break;
    case syncTypes.ON_CHANGE_LAST_DESC:
      state = {
        ...state,
        poll: {
          ...state.poll,
          lastDesc: action.payload,
        },
      };
      break;
    case syncTypes.ANSWER_AUTO_CHANGE_TIME:
      state = {
        ...state,
        poll: {
          ...state.poll,
          settings: {
            ...state.settings,
            hasAnswerAutoChangeTime: action.payload.hasAnswerAutoChangeTime,
          },
        },
      };
      break;
    case syncTypes.ADD_ANSWER_AUTO_CHANGE_TIME:
      state = {
        ...state,
        poll: {
          ...state.poll,
          settings: {
            ...state.settings,
            answerAutoChangeTime: action.payload.answerAutoChangeTime,
          },
        },
      };
      break;
    case syncTypes.ANSWER_TIME:
      state = {
        ...state,
        poll: {
          ...state.poll,
          settings: {
            ...state.settings,
            hasAnswerTime: action.payload.hasAnswerTime,
          },
        },
      };
      break;
    case syncTypes.ADD_ANSWER_TIME:
      state = {
        ...state,
        poll: {
          ...state.poll,
          settings: {
            ...state.settings,
            answerTime: action.payload.answerTime,
          },
        },
      };
      break;
    case syncTypes.POLL_TIME:
      state = {
        ...state,
        poll: {
          ...state.poll,
          settings: {
            ...state.settings,
            hasPollTime: action.payload.hasPollTime,
          },
        },
      };
      break;
    case syncTypes.ADD_POLL_TIME:
      state = {
        ...state,
        poll: {
          ...state.poll,
          settings: {
            ...state.settings,
            pollTime: action.payload.pollTime,
          },
        },
      };
      break;
    case syncTypes.SHOW_TYPE:
      state = {
        ...state,
        poll: {
          ...state.poll,
          settings: {
            ...state.settings,
            showType: action.payload.showType,
          },
        },
      };
      break;
    case syncTypes.TYPE:
      state = {
        ...state,
        poll: {
          ...state.poll,
          settings: {
            ...state.settings,
            type: action.payload.type,
          },
        },
      };
      break;
    case syncTypes.USER_DATA_COLLECT_TYPE:
      state = {
        ...state,
        poll: {
          ...state.poll,
          settings: {
            ...state.settings,
            userDataCollectType: action.payload.userDataCollectType,
          },
        },
      };
      break;
    case syncTypes.POLL_ACTIVE:
      state = {
        ...state,
        poll: {
          ...state.poll,
          settings: {
            ...state.settings,
            isPollActive: action.payload.isPollActive,
          },
        },
      };
      break;
    case syncTypes.ANSWER_PERCENT:
      state = {
        ...state,
        poll: {
          ...state.poll,
          settings: {
            ...state.settings,
            hasAnswerPercent: action.payload.hasAnswerPercent,
          },
        },
      };
      break;
    case syncTypes.ON_CHANGE_SELECTABLE_LAST_MESSAGE:
      state = {
        ...state,
        poll: {
          ...state.poll,
          selectableLastMessages: action.payload.newSelectableLastMessages,
        },
      };
      break;
    case syncTypes.ADD_SELECTABLE_LAST_MESSAGE:
      state = {
        ...state,
        poll: {
          ...state.poll,
          selectableLastMessages: action.payload.selectableLastMessages,
        },
      };
      break;
    case syncTypes.ADD_QUESTION:
      state = {
        ...state,
        poll: {
          ...state.poll,
          questions: action.payload,
        },
      };
      break;
    case syncTypes.DELETE_QUESTION:
      state = {
        ...state,
        poll: {
          ...state.poll,
          questions: action.payload,
        },
      };
      break;
    case syncTypes.ON_CHANGE_QUESTION:
      state = {
        ...state,
        poll: {
          ...state.poll,
          questions: action.payload,
        },
      };
      break;
    case syncTypes.ON_CHANGE_TYPE_QUESTION:
      state = {
        ...state,
        poll: {
          ...state.poll,
          questions: action.payload,
        },
      };
      break;
    case syncTypes.ON_CHANGE_RIGHT_ANSWER:
      state = {
        ...state,
        poll: {
          ...state.poll,
          questions: action.payload,
        },
      };
      break;
    case syncTypes.ON_CHANGE_QUESTION_DESC:
      state = {
        ...state,
        poll: {
          ...state.poll,
          questions: action.payload,
        },
      };
      break;
    case syncTypes.ADD_ANSWER:
      state = {
        ...state,
        poll: {
          ...state.poll,
          questions: action.payload,
        },
      };
      break;
    case syncTypes.DELETE_ANSWER:
      state = {
        ...state,
        poll: {
          ...state.poll,
          questions: action.payload,
        },
      };
      break;
    case syncTypes.ON_CHANGE_ANSWER:
      state = {
        ...state,
        poll: {
          ...state.poll,
          questions: action.payload,
        },
      };
      break;
    case syncTypes.ON_CHANGE_TYPE_ANSWER:
      state = {
        ...state,
        poll: {
          ...state.poll,
          questions: action.payload,
        },
      };
      break;
    default: {
      return state;
    }
  }
  return state;
};

export default pollReducer;
