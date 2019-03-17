import {
  addQuestion, deleteQuestion, updatequestionIndex,
  onChangeQuestionContent, onChangeQuestionType, onChangeQuestionDesc,
} from './questionsActions';
import {
  addAnswer, deleteAnswer, onChangeAnswerContent, onChangeAnswerType, onChangeRightAnswer,
} from './answersActions';
import {
  handleHasPollTime, handleHasAnswerTime, handleHasAnswerAutoChangeTime, handleShowType,
  handleIsPollActive, handlePollTime, handleAnswerAutoChangeTime, handleAnswerTime, handleHasAnswerPercent,
  handleType, handleUserDataCollectType,
} from './settingsActions';
import {
  onChangeName, onChangeDesc, onChangeLastDesc,
  getUpdatePoll, onChangeJs, onChangeCss, handleSelectableLastMessage,
} from './pollActions';


export {
  onChangeName,
  onChangeDesc,
  onChangeLastDesc,
  onChangeJs,
  onChangeCss,
  handleSelectableLastMessage,
  getUpdatePoll,

  addQuestion,
  deleteQuestion,
  updatequestionIndex,
  onChangeQuestionContent,
  onChangeQuestionType,
  onChangeRightAnswer,
  onChangeQuestionDesc,

  handleHasPollTime,
  handleHasAnswerTime,
  handleHasAnswerAutoChangeTime,
  handleShowType,
  handleIsPollActive,
  handlePollTime,
  handleAnswerAutoChangeTime,
  handleAnswerTime,
  handleHasAnswerPercent,
  handleType,
  handleUserDataCollectType,

  addAnswer,
  deleteAnswer,
  onChangeAnswerContent,
  onChangeAnswerType,
};
