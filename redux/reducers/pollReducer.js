/* eslint-disable no-param-reassign */
import {
  ANSWER_AUTO_CHANGE_TIME,
  ANSWER_TIME,
  POLL_TIME,
  SHOW_TYPE,
  TYPE,
  USER_DATA_COLLECT_TYPE,
  POLL_ACTIVE,
  ANSWER_PERCENT,
  ADD_POLL_TIME,
  ADD_ANSWER_AUTO_CHANGE_TIME,
  ADD_ANSWER_TIME,
  ADD_QUESTION,
  DELETE_QUESTION,
  UPDATE_QUESTION_ORDER,
  ON_CHANGE_QUESTION,
  ON_CHANGE_TYPE_QUESTION,
  ADD_ANSWER,
  DELETE_ANSWER,
  ON_CHANGE_ANSWER,
  ON_CHANGE_TYPE_ANSWER,
  ON_CLICK_RIGHT_ANSWER,
  ON_CHANGE_NAME,
  ON_CHANGE_DESC,
  ON_CHANGE_LAST_DESC,
  ON_CHANGE_SLUG,
  GET_UPDATE_POLL,
  ON_CHANGE_CSS,
  ON_CHANGE_JS,
  ON_CHANGE_QUESTION_DESC,
  ON_CHANGE_SELECTABLE_LAST_MESSAGE,
  ADD_SELECTABLE_LAST_MESSAGE,
} from '../types';

const initialState = {
  id: '',
  userId: '',
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
    isPollActive: true,
    hasAnswerPercent: false,
    type: 'test',
    userDataCollectType: 'form',
  },
};

const pollReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_UPDATE_POLL:
      state = action.payload;
      break;
    case ON_CHANGE_CSS:
      state = {
        ...state,
        css: action.payload,
      };
      break;
    case ON_CHANGE_JS:
      state = {
        ...state,
        js: action.payload,
      };
      break;
    case ON_CHANGE_NAME:
      state = {
        ...state,
        name: action.payload,
      };
      break;
    case ON_CHANGE_DESC:
      state = {
        ...state,
        desc: action.payload,
      };
      break;
    case ON_CHANGE_LAST_DESC:
      state = {
        ...state,
        lastDesc: action.payload,
      };
      break;
    case ON_CHANGE_SLUG:
      state = {
        ...state,
        slug: action.payload,
      };
      break;
    case ANSWER_AUTO_CHANGE_TIME:
      state = {
        ...state,
        settings: {
          ...state.settings,
          hasAnswerAutoChangeTime: action.payload.hasAnswerAutoChangeTime,
        },
      };
      break;
    case ADD_ANSWER_AUTO_CHANGE_TIME:
      state = {
        ...state,
        settings: {
          ...state.settings,
          answerAutoChangeTime: action.payload.answerAutoChangeTime,
        },
      };
      break;
    case ANSWER_TIME:
      state = {
        ...state,
        settings: {
          ...state.settings,
          hasAnswerTime: action.payload.hasAnswerTime,
        },
      };
      break;
    case ADD_ANSWER_TIME:
      state = {
        ...state,
        settings: {
          ...state.settings,
          answerTime: action.payload.answerTime,
        },
      };
      break;
    case POLL_TIME:
      state = {
        ...state,
        settings: {
          ...state.settings,
          hasPollTime: action.payload.hasPollTime,
        },
      };
      break;
    case ADD_POLL_TIME:
      state = {
        ...state,
        settings: {
          ...state.settings,
          pollTime: action.payload.pollTime,
        },
      };
      break;
    case SHOW_TYPE:
      state = {
        ...state,
        settings: {
          ...state.settings,
          showType: action.payload.showType,
        },
      };
      break;
    case TYPE:
      state = {
        ...state,
        settings: {
          ...state.settings,
          type: action.payload.type,
        },
      };
      break;
    case USER_DATA_COLLECT_TYPE:
      state = {
        ...state,
        settings: {
          ...state.settings,
          userDataCollectType: action.payload.userDataCollectType,
        },
      };
      break;
    case POLL_ACTIVE:
      state = {
        ...state,
        settings: {
          ...state.settings,
          isPollActive: action.payload.isPollActive,
        },
      };
      break;
    case ANSWER_PERCENT:
      state = {
        ...state,
        settings: {
          ...state.settings,
          hasAnswerPercent: action.payload.hasAnswerPercent,
        },
      };
      break;
    case ON_CHANGE_SELECTABLE_LAST_MESSAGE:
      state = {
        ...state,
        selectableLastMessages: action.payload.newSelectableLastMessages,
      };
      break;
    case ADD_SELECTABLE_LAST_MESSAGE:
      state = {
        ...state,
        selectableLastMessages: action.payload.selectableLastMessages,
      };
      break;
    case ADD_QUESTION:
      state = {
        ...state,
        questions: action.payload.questions,
      };
      break;
    case DELETE_QUESTION:
      state = {
        ...state,
        questions: action.payload.questions,
      };
      break;
    case UPDATE_QUESTION_ORDER:
      state = {
        ...state,
        questions: action.payload.questions,
      };
      break;
    case ON_CHANGE_QUESTION:
      state = {
        ...state,
        questions: action.payload.newQuestions,
      };
      break;
    case ON_CHANGE_TYPE_QUESTION:
      state = {
        ...state,
        questions: action.payload.newQuestions,
      };
      break;
    case ON_CLICK_RIGHT_ANSWER:
      state = {
        ...state,
        questions: action.payload.newQuestions,
      };
      break;
    case ON_CHANGE_QUESTION_DESC:
      state = {
        ...state,
        questions: action.payload.newQuestions,
      };
      break;
    case ADD_ANSWER:
      state = {
        ...state,
        answers: action.payload.answers,
      };
      break;
    case DELETE_ANSWER:
      state = {
        ...state,
        answers: action.payload.answers,
      };
      break;
    case ON_CHANGE_ANSWER:
      state = {
        ...state,
        answers: action.payload.newAnswers,
      };
      break;
    case ON_CHANGE_TYPE_ANSWER:
      state = {
        ...state,
        answers: action.payload.newAnswers,
      };
      break;
    default: {
      return state;
    }
  }
  return state;
};

export default pollReducer;
