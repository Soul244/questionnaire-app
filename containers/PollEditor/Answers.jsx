import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { SortableContainer } from 'react-sortable-hoc';
import { Answer } from '../../components/PollEditor';
import * as pollActions from '../../redux/actions/pollActions';

@SortableContainer
class Answers extends React.Component {
  render() {
    const {
      pollReducer,
      pollActions,
      answers,
      questionIndex,
      rightAnswerIndex,
      uniqueKey,
    } = this.props;

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
}

class SortableComponent extends Component {
  onSortEnd = ({ oldIndex, newIndex }) => {
    const { pollActions, questionIndex } = this.props;
    const { reOrderAnswer } = pollActions;
    reOrderAnswer(oldIndex, newIndex, questionIndex);
  };

  render() {
    const { props } = this;
    return <Answers {...props} onSortEnd={this.onSortEnd} lockAxis="y" transitionDuration={0} useDragHandle />;
  }
}

SortableComponent.defaultProps = {
  rightAnswerIndex: null,
};

SortableComponent.propTypes = {
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
)(SortableComponent);
