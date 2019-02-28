import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import Answer from './Answer';
import * as pollActions from '../../redux/actions/pollActions';

function Answers(props) {
  const {
    pollActions,
    questionIndex,
    poll,
  } = props;
  const {
    onChangeAnswerContent,
    onChangeAnswerType,
    onChangeRightAnswer,
    deleteAnswer,
  } = pollActions;
  const {
    answers,
    questions,
  } = poll;
  const filteredAnswers = [];
  for (let index = 0; index < answers.length; index += 1) {
    if (answers[index].questionIndex === questionIndex) {
      filteredAnswers.push(
        <Answer
          key={index}
          index={index}
          questionIndex={questionIndex}
        // Answer Functions
          onChangeAnswerContent={onChangeAnswerContent}
          onChangeAnswerType={onChangeAnswerType}
          deleteAnswer={deleteAnswer}
          onChangeRightAnswer={onChangeRightAnswer}
        // Answer Data
          type={answers[index].type}
          content={answers[index].content}
          pollType={poll.settings.type}
          rightAnswerIndex={questions[questionIndex].rightAnswerIndex}
        />,
      );
    }
  }
  return (
    <ul>
      {filteredAnswers}
    </ul>
  );
}

Answers.propTypes = {
  questionIndex: PropTypes.number.isRequired,
  poll: PropTypes.object.isRequired,
  pollActions: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  poll: state.poll,
});

const mapDispatchToProps = dispatch => ({
  pollActions: bindActionCreators(pollActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Answers);
