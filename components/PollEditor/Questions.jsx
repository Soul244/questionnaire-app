import React from 'react';
import PropTypes from 'prop-types';

import Question from './Question';

const Questions = (props) => {
  const { deleteQuestion, questions } = props;
  return (
    <ul>
      {questions.map((question, index) => (
        <Question
          key={index}
          deleteQuestion={deleteQuestion}
          order={question.order}
          type={question.type}
          desc={question.desc}
          rightAnswerOrder={question.rightAnswerOrder}
          content={question.content}
        />
      ))}
    </ul>
  );
};

Questions.propTypes = {
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      order: PropTypes.number.isRequired,
      type: PropTypes.oneOf([
        'text',
        'heading',
        'image',
        'external-media',
        'gif',
        'audio',
      ]).isRequired,
      content: PropTypes.string.isRequired,
    }),
  ).isRequired,
  deleteQuestion: PropTypes.func.isRequired,
};

export default Questions;
