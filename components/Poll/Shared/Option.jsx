import React from 'react';
import PropTypes from 'prop-types';

import {
  Card,
  CardBody,
  Input,
  Col,
  Row,
} from 'reactstrap';
import styled from 'styled-components';

import { ContentViewer } from '../../Shared';

const CardStyled = styled(Card)`
  border-width: ${props => (props.checked ? '5px' : '0')};
  border-color: ${props => (
    props.checked && props.rightAnswerIndex !== null && (props.index === props.rightAnswerIndex ? '#009800' : '#cb1010')
  )};
  background-color: ${props => (
    props.checked && props.rightAnswerIndex !== null && (props.index === props.rightAnswerIndex ? '#1dcb10' : 'red')
  )};
`;

const Text = styled.p`
  display: ${props => (props.show ? 'inline-block' : 'none')};
`;

function Option(props) {
  const {
    index,
    questionIndex,
    rightAnswerIndex,
    type,
    content,
    checked,
    onClick,
    answerCount,
    questionCount,
    showPercent,
  } = props;
  return (
    <Col md={6}>
      <CardStyled
        className="my-1"
        onClick={() => onClick(index)}
        checked={checked === index}
        index={index}
        rightAnswerIndex={rightAnswerIndex}
      >
        <CardBody className="text-center ">
          <Input
            addon
            type="radio"
            name={questionIndex}
            value={index}
            checked={checked === index}
            style={{ display: 'none' }}
          />
          <Row>
            <Col>
              {questionCount > 0 && answerCount > 0 && (
                <>
                  <Text show={showPercent}>{`${Math.round((answerCount / questionCount) * 100)}%`}</Text>
                  {' '}
                </>
              )}
              {answerCount === 0 && (
                <>
                  <Text show={showPercent}>0%</Text>
                  {' '}
                </>
              )}
              <ContentViewer type={type} content={content} />
            </Col>
          </Row>
        </CardBody>
      </CardStyled>
    </Col>
  );
}

Option.propTypes = {
  index: PropTypes.number.isRequired,
  questionIndex: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  rightAnswerIndex: PropTypes.number,
  checked: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  onClick: PropTypes.func.isRequired,
  answerCount: PropTypes.number.isRequired,
  showPercent: PropTypes.bool.isRequired,
  questionCount: PropTypes.number.isRequired,
};

export default Option;
