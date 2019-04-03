import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Question } from '../../components/PollEditor';
import Answers from './Answers';
import * as pollActions from '../../redux/actions/pollActions';

function Questions(props) {
  const { pollActions, pollReducer } = props;
  const { poll } = pollReducer;
  const { questions } = poll;
  const {
    onChangeQuestionContent,
    onChangeQuestionDesc,
    onChangeQuestionType,
    deleteQuestion,
    addAnswer,
  } = pollActions;
  return (
    <ul>
      {questions.map((question, index) => (
        <Question
          key={index}
          index={index}
          // Question Functions
          onChangeQuestionContent={onChangeQuestionContent}
          onChangeQuestionType={onChangeQuestionType}
          onChangeQuestionDesc={onChangeQuestionDesc}
          deleteQuestion={deleteQuestion}
          // Question Data
          content={question.content}
          type={question.type}
          desc={question.desc}
          // Add Answer Function
          addAnswer={addAnswer}
        >
          <Answers
            answers={question.answers}
            questionIndex={index}
            rightAnswerIndex={question.rightAnswerIndex}
          />
        </Question>
      ))}
    </ul>
  );
}

Questions.propTypes = {
  pollReducer: PropTypes.object.isRequired,
  pollActions: PropTypes.object.isRequired,
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
)(Questions);
