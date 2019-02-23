import React from 'react';
import PropTypes from 'prop-types';

import Answer from './Answer';

const Answers = ({ answers, questionOrder, rightAnswerOrder }) => {
  answers.reverse();
  return (
    <ul>
      {answers.map((answer, index) => (
        <Answer
          key={index}
          order={answer.order}
          questionOrder={questionOrder}
          type={answer.type}
          content={answer.content}
          rightAnswerOrder={rightAnswerOrder}
        />
      ))}
    </ul>
  );
};

Answers.propTypes = {
  questionOrder: PropTypes.number.isRequired,
  answers: PropTypes.array.isRequired,
  rightAnswerOrder: PropTypes.number,
};

export default Answers;
