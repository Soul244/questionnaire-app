import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { Answer } from '../../components/PollEditor';
import * as pollActions from '../../redux/actions/pollActions';

function Answers(props) {
  const {
    pollReducer,
    pollActions,
    answers,
    questionIndex,
    rightAnswerIndex,
  } = props;

  const {
    onChangeAnswerContent,
    onChangeAnswerType,
    onChangeRightAnswer,
    deleteAnswer,
  } = pollActions;

  const { poll } = pollReducer;

  return (
    <ul>
      {answers.map((answer, index) => (
        <Answer
          key={index}
          index={index}
          questionIndex={questionIndex}
          rightAnswerIndex={rightAnswerIndex}
          // Answer Functions
          onChangeAnswerContent={onChangeAnswerContent}
          onChangeAnswerType={onChangeAnswerType}
          deleteAnswer={deleteAnswer}
          onChangeRightAnswer={onChangeRightAnswer}
          // Answer Data
          type={answer.type}
          content={answer.content}
          pollType={poll.settings.type}
        />
      ))}
    </ul>
  );
}

Answers.defaultProps = {
  rightAnswerIndex: null,
};

Answers.propTypes = {
  pollReducer: PropTypes.object.isRequired,
  pollActions: PropTypes.object.isRequired,
  rightAnswerIndex: PropTypes.number,
  questionIndex: PropTypes.number.isRequired,
  answers: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  pollReducer: state.pollReducer,
});

const mapDispatchToProps = dispatch => ({
  pollActions: bindActionCreators(pollActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Answers);
