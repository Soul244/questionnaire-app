import React from 'react';
import PropTypes from 'prop-types';

import {
  Row,
} from 'reactstrap';
import styled from 'styled-components';

import {
  Question, Options,
} from '..';


const QuestionContainer = styled.div`
  margin-bottom: 7rem;
`;

function Full({
  questions,
  addParticipantAnswer,
}) {
  return (
    <div>
      {questions.map((question, index) => (
        <QuestionContainer key={`poll${index}`}>
          <Row>
            <Question
              type={question.type}
              content={question.content}
              index={question.index}
              desc={question.desc}
            />
          </Row>
          <Row>
            <Options
              answers={question.answers}
              questionCount={question.count}
              questionIndex={index}
              rightAnswerIndex={question.rightAnswerIndex}
              changeQuestion={() => {}}
              addParticipantAnswer={addParticipantAnswer}
            />
          </Row>
        </QuestionContainer>
      ))}
    </div>
  );
}

Full.propTypes = {
  addParticipantAnswer: PropTypes.func.isRequired,
  questions: PropTypes.array.isRequired,
};

export default Full;
