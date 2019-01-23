import React from 'react';
import PropTypes from 'prop-types';

import Answer from './Answer';

const Answers = ({ answers, questionOrder, rightAnswerOrder }) => {
  const filteredAnswers = answers.filter(answer => answer.questionOrder === questionOrder);
  filteredAnswers.reverse();
  return (
    <ul>
      {filteredAnswers.map((value, index) => (
        <Answer
          key={index}
          order={value.order}
          questionOrder={questionOrder}
          type={value.type}
          content={value.content}
          rightAnswerOrder={rightAnswerOrder}
        />
      ))}
    </ul>
  );
};

Answers.propTypes = {
  questionOrder: PropTypes.number.isRequired,
};

export default Answers;
