import {
  addQuestion, deleteQuestion, updateQuestionOrder,
  onChangeQuestion, onChangeQuestionType, onClickRightAnswer, onChangeQuestionDesc,
} from './questionsActions';
import {
  addAnswer, deleteAnswer, onChangeAnswer, onChangeAnswerType,
} from './answersActions';
import {
  handleHasPollTime, handleHasAnswerTime, handleHasAnswerAutoChangeTime, handleShowType,
  handleIsPollActive, handlePollTime, handleAnswerAutoChangeTime, handleAnswerTime, handleHasAnswerPercent,
  handleType, handleUserDataCollectType,
} from './settingsActions';
import {
  onChangeName, onChangeDesc, onChangeLastDesc, onChangeSlug,
  getUpdatePoll, onChangeJs, onChangeCss, handleSelectableLastMessage,
} from './pollActions';


export {
  onChangeName,
  onChangeDesc,
  onChangeLastDesc,
  onChangeSlug,
  onChangeJs,
  onChangeCss,
  handleSelectableLastMessage,
  getUpdatePoll,

  addQuestion,
  deleteQuestion,
  updateQuestionOrder,
  onChangeQuestion,
  onChangeQuestionType,
  onClickRightAnswer,
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
  onChangeAnswer,
  onChangeAnswerType,
};
