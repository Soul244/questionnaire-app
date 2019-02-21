import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Option from './Option';

class Options extends React.Component {
  static propTypes= {
    questionOrder: PropTypes.number.isRequired,
    rightAnswerOrder: PropTypes.number.isRequired,
    changeQuestion: PropTypes.func.isRequired,
    questionCount: PropTypes.number.isRequired,
    answers: PropTypes.array.isRequired,
    addParticipantAnswer: PropTypes.func.isRequired,
  };
  constructor() {
    super();
    this.state = {
      checked: '',
      showPercent: false,
    };
  }

  onClick = (value) => {
    if (this.state.checked !== '') return;
    this.setState({
      checked: value,
      showPercent: true,
    });
    const { questionOrder, rightAnswerOrder } = this.props;
    this.props.addParticipantAnswer(questionOrder, value, rightAnswerOrder);
    this.props.changeQuestion();
  }

  render() {
    const {
      answers, questionOrder, rightAnswerOrder, questionCount,
    } = this.props;
    const { checked, showPercent } = this.state;
    return (
      <Fragment>
        {answers.filter(answer => answer.questionOrder === questionOrder).map((answer, index) => (
          <Option
            key={index}
            order={answer.order}
            questionOrder={answer.questionOrder}
            answerCount={answer.count}
            questionCount={questionCount}
            rightAnswerOrder={rightAnswerOrder}
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
