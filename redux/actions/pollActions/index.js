import {
  addQuestion, deleteQuestion,
  onChangeQuestionContent, onChangeQuestionType, onChangeQuestionDesc, reOrderQuestion,
} from './questionsActions';
import {
  addAnswer, deleteAnswer, onChangeAnswerContent, onChangeAnswerType, onChangeRightAnswer, reOrderAnswer,
} from './answersActions';
import {
  handleHasPollTime, handleHasAnswerTime, handleHasAnswerAutoChangeTime, handleShowType,
  handleIsPollActive, handlePollTime, handleAnswerAutoChangeTime, handleAnswerTime, handleHasAnswerPercent,
  handleType, handleUserDataCollectType,
} from './settingsActions';
import {
  onChangeName, onChangeDesc, onChangeLastDesc,
  onChangeJs, onChangeCss, handleSelectableLastMessage,
  getPoll, postPoll, deletePoll, updatePoll, getPolls,
} from './pollActions';


export {
  onChangeName,
  onChangeDesc,
  onChangeLastDesc,
  onChangeJs,
  onChangeCss,
  handleSelectableLastMessage,

  getPolls,
  getPoll,
  postPoll,
  deletePoll,
  updatePoll,

  addQuestion,
  deleteQuestion,
  onChangeQuestionContent,
  onChangeQuestionType,
  onChangeRightAnswer,
  onChangeQuestionDesc,
  reOrderQuestion,

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
  reOrderAnswer,
};
