import React from 'react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import PropTypes from 'prop-types';

import Question from '../../components/NewPoll/Question';

const SortableItem = SortableElement(
  ({
    order, type, content, deleteQuestion, desc, rightAnswerOrder,
  }) => (
    <Question
      deleteQuestion={deleteQuestion}
      order={order}
      type={type}
      desc={desc}
      rightAnswerOrder={rightAnswerOrder}
      content={content}
    />
  ),
);

const SortableList = SortableContainer(({ questions, deleteQuestion }) => (
  <ul>
    {questions.map((value, index) => (
      <SortableItem
        key={`item-${index}-${value.order}`}
        order={value.order}
        index={index}
        deleteQuestion={deleteQuestion}
        {...value}
      />
    ))}
  </ul>
));

const Questions = (props) => {
  const { deleteQuestion, questions, updateQuestionOrder } = props;
  return (
    <SortableList
      questions={questions}
      deleteQuestion={deleteQuestion}
      onSortEnd={updateQuestionOrder}
      lockAxis="y"
    />
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
  updateQuestionOrder: PropTypes.func.isRequired,
};

export default Questions;
