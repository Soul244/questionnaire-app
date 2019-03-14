import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Option from './Option';

class Options extends React.Component {
  constructor() {
    super();
    this.state = {
      checked: '',
      showPercent: false,
    };
  }

  onClick = (value) => {
    const {
      questionIndex, rightAnswerIndex, addParticipantAnswer, changeQuestion,
    } = this.props;
    const { checked } = this.state;
    if (checked !== '') return;
    this.setState({
      checked: value,
      showPercent: true,
    });
    addParticipantAnswer(questionIndex, value, rightAnswerIndex);
    changeQuestion();
  };

  render() {
    const {
      answers,
      questionIndex,
      rightAnswerIndex,
      questionCount,
    } = this.props;
    const { checked, showPercent } = this.state;
    return (
      <Fragment>
        {answers
          .filter(answer => answer.questionIndex === questionIndex)
          .map((answer, index) => (
            <Option
              key={index}
              index={index}
              order={answer.index}
              questionIndex={answer.questionIndex}
              answerCount={answer.count}
              questionCount={questionCount}
              rightAnswerIndex={rightAnswerIndex}
              type={answer.type}
              showPercent={showPercent}
              content={answer.content}
              checked={checked}
              onClick={this.onClick}
            />
          ))}
      </Fragment>
    );
  }
}

Options.defaultProps = {
  rightAnswerIndex: null,
};

Options.propTypes = {
  questionIndex: PropTypes.number.isRequired,
  rightAnswerIndex: PropTypes.number,
  changeQuestion: PropTypes.func.isRequired,
  questionCount: PropTypes.number.isRequired,
  answers: PropTypes.array.isRequired,
  addParticipantAnswer: PropTypes.func.isRequired,
};

export default Options;
