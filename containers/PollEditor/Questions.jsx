import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Question } from '../../components/PollEditor';
import Answers from './Answers';
import * as pollActions from '../../redux/actions/pollActions';
import { SortableContainer } from '../../components/Sortable';

class Questions extends Component {
  onSortEnd = ({ oldIndex, newIndex }) => {
    const { pollActions } = this.props;
    const { reOrderQuestion } = pollActions;
    reOrderQuestion(oldIndex, newIndex);
  };

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
      <SortableContainer onSortEnd={this.onSortEnd} lockAxis="y" transitionDuration={0} useDragHandle>
        {questions.map((question, index) => (
          <Question
            index={index}
            key={index}
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
      </SortableContainer>
    );
  }
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
