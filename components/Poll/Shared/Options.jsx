import React, { Fragment } from "react";
import PropTypes from "prop-types";

import Option from "./Option";

class Options extends React.Component {
  static propTypes = {
    questionIndex: PropTypes.number.isRequired,
    rightAnswerIndex: PropTypes.number,
    changeQuestion: PropTypes.func.isRequired,
    questionCount: PropTypes.number.isRequired,
    answers: PropTypes.array.isRequired,
    addParticipantAnswer: PropTypes.func.isRequired
  };
  constructor() {
    super();
    this.state = {
      checked: "",
      showPercent: false
    };
  }

  onClick = value => {
    if (this.state.checked !== "") return;
    this.setState({
      checked: value,
      showPercent: true
    });
    const { questionIndex, rightAnswerIndex } = this.props;
    this.props.addParticipantAnswer(questionIndex, value, rightAnswerIndex);
    this.props.changeQuestion();
  };

  render() {
    const {
      answers,
      questionIndex,
      rightAnswerIndex,
      questionCount
    } = this.props;
    const { checked, showPercent } = this.state;
    return (
      <Fragment>
        {answers
          .filter(answer => answer.questionIndex === questionIndex)
          .map((answer, index) => (
            <Option
              key={index}
              index={answer.index}
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

export default Options;
