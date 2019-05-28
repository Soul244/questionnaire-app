import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { SortableContainer } from '~components/Sortable';
import { Answer } from '~components/PollEditor';
import { pollActions } from '~redux/actions';

class Answers extends React.Component {
  onSortEnd = ({ oldIndex, newIndex }) => {
    const { pollActions, questionIndex } = this.props;
    const { reOrderAnswer } = pollActions;
    reOrderAnswer(oldIndex, newIndex, questionIndex);
  };

  render() {
    const {
      pollReducer,
      pollActions,
      answers,
      questionIndex,
      rightAnswerIndex,
    } = this.props;

    const {
      onChangeAnswerContent,
      onChangeAnswerType,
      onChangeRightAnswer,
      deleteAnswer,
    } = pollActions;

    const { poll } = pollReducer;
    return (
      <SortableContainer onSortEnd={this.onSortEnd} lockAxis="y" transitionDuration={0} useDragHandle>
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
      </SortableContainer>
    );
  }
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
