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
    props.checked && props.bg !== null && (props.index === props.bg ? '#009800' : '#cb1010')
  )};
  background-color: ${props => (
    props.checked && props.bg !== null && (props.index === props.bg ? '#1dcb10' : 'red')
  )};
  background-color: ${props => (
    props.checked && (props.bg === null ? 'lightgray' : '')
  )};
`;

const Text = styled.p`
  margin: 0.5rem 0;
  display: ${props => (props.show ? 'block' : 'none')};
`;

function Option({
  index,
  questionIndex,
  order,
  rightAnswerIndex,
  type,
  content,
  checked,
  onClick,
  answerCount,
  questionCount,
  showPercent,
}) {
  return (
    <Col md={6}>
      <CardStyled
        className="my-1"
        onClick={() => onClick(order)}
        checked={checked === order}
        index={index}
        bg={rightAnswerIndex}
      >
        <CardBody className="text-center ">
          <Row>
            <Col>
              {questionCount > 0 && answerCount > 0 && (
                <>
                  <Text show={showPercent}>{`${Math.round((answerCount / questionCount) * 100)}%`}</Text>
                </>
              )}
              {answerCount === 0 && (
                <>
                  <Text show={showPercent}>0%</Text>
                </>
              )}
              <ContentViewer type={type} content={content} />
              <Text show={showPercent}>
                {`${answerCount} kişi sizinle aynı fikirde`}
              </Text>
            </Col>
          </Row>
        </CardBody>
      </CardStyled>
    </Col>
  );
}

Option.defaultProps = {
  rightAnswerIndex: null,
};

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
