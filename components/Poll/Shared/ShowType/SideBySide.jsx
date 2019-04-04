import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Swiper from 'react-id-swiper';
import {
  Row,
} from 'reactstrap';
import { Question, Options } from '..';

const QuestionContainer = styled.div` 
  padding: 0.05rem;
`;

class SideBySide extends React.Component {
  render() {
    const {
      questions,
      changeQuestion,
      addParticipantAnswer,
    } = this.props;

    const params = {
      pagination: {
        el: '.swiper-pagination',
        type: '',
        clickable: true,
      },
    };
    return (
      <Swiper {...params} ref={node => (node ? this.swiper = node.swiper : '')}>
        {questions.map((question, index) => (
          <QuestionContainer key={`poll${index}`}>
            <Row>
              <Question
                questionIndex={index}
                type={question.type}
                content={question.content}
                desc={question.desc}
              />
            </Row>
            <Row>
              <Options
                questionIndex={index}
                rightAnswerIndex={question.rightAnswerIndex}
                answers={question.answers}
                questionCount={question.count}
                changeQuestion={changeQuestion}
                addParticipantAnswer={addParticipantAnswer}
              />
            </Row>
          </QuestionContainer>
        ))}
      </Swiper>
    );
  }
}

SideBySide.propTypes = {
  changeQuestion: PropTypes.func.isRequired,
  addParticipantAnswer: PropTypes.func.isRequired,
  questions: PropTypes.array.isRequired,
};

export default SideBySide;
