import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Question } from '../../components/PollEditor';
import * as pollActions from '../../redux/actions/pollActions';

function Questions(props) {
  const { pollActions, poll } = props;
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
        />
      ))}
    </ul>
  );
}

Questions.propTypes = {
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
)(Questions);
