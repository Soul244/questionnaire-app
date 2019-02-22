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
  handleNameOnChange, handleDescOnChange, handleLastDescOnChange, handleSlugOnChange,
  getUpdatePoll, handleJsOnChange, handleCssOnChange, handleSelectableLastMessage,
} from './pollActions';


export {
  handleNameOnChange,
  handleDescOnChange,
  handleLastDescOnChange,
  handleSlugOnChange,
  handleJsOnChange,
  handleCssOnChange,
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
