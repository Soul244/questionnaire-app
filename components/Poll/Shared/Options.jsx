import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Option from './Option';

class Options extends React.Component {
  constructor() {
    super();
    this.state = {
      checkedAnswerIndex: null,
      showPercent: false,
    };
  }

  onClick = (answerIndex) => {
    const {
      questionIndex, addParticipantAnswer, changeQuestion,
    } = this.props;
    this.setState({
      checkedAnswerIndex: answerIndex,
      showPercent: true,
    });
    addParticipantAnswer(questionIndex, answerIndex);
    changeQuestion();
  };

  render() {
    const {
      answers,
      questionCount,
      questionIndex,
    } = this.props;
    const { checkedAnswerIndex, showPercent } = this.state;
    return (
      <Fragment>
        {answers.map((answer, index) => (
          <Option
            key={index}
            answerIndex={index}
            questionCount={questionCount}
            questionIndex={questionIndex}

            answerCount={answer.count}
            isTrue={answer.isTrue}
            type={answer.type}
            content={answer.content}

            showPercent={showPercent}
            checkedAnswerIndex={checkedAnswerIndex}
            onClick={this.onClick}
          />
        ))}
      </Fragment>
    );
  }
}

Options.propTypes = {
  questionIndex: PropTypes.number.isRequired,
  changeQuestion: PropTypes.func.isRequired,
  questionCount: PropTypes.number.isRequired,
  answers: PropTypes.array.isRequired,
  addParticipantAnswer: PropTypes.func.isRequired,
};

export default Options;
