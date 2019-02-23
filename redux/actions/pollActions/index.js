import {
  handleAddQuestion, handleDeleteQuestion, handleUpdateQuestionOrder,
  handleOnChangeQuestion, handleOnChangeTypeQuestion, handleOnClickRightAnswer, handleOnChangeQuestionDesc,
} from './questionsActions';
import {
  handleAddAnswer, handleDeleteAnswer, handleOnChangeAnswer, handleOnChangeTypeAnswer,
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

  handleAddQuestion,
  handleDeleteQuestion,
  handleUpdateQuestionOrder,
  handleOnChangeQuestion,
  handleOnChangeTypeQuestion,
  handleOnClickRightAnswer,
  handleOnChangeQuestionDesc,

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

  handleAddAnswer,
  handleDeleteAnswer,
  handleOnChangeAnswer,
  handleOnChangeTypeAnswer,
};
