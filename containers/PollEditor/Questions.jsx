import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SortableContainer } from 'react-sortable-hoc';
import { Question } from '../../components/PollEditor';
import Answers from './Answers';
import * as pollActions from '../../redux/actions/pollActions';

@SortableContainer
class Questions extends React.Component {
  render() {
    const { pollActions, pollReducer } = this.props;
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
              uniqueKey={question._id ? question._id : question.tempId}
              questionIndex={index}
              rightAnswerIndex={question.rightAnswerIndex}
            />
          </Question>
        ))}
      </ul>
    );
  }
}

class SortableComponent extends Component {
  onSortEnd = ({ oldIndex, newIndex }) => {
    const { pollActions } = this.props;
    const { reOrderQuestion } = pollActions;
    reOrderQuestion(oldIndex, newIndex);
  };

  render() {
    const { props } = this;
    return <Questions {...props} onSortEnd={this.onSortEnd} />;
  }
}


SortableComponent.propTypes = {
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
)(SortableComponent);
