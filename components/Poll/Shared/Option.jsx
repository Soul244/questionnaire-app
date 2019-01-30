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
    props.checked && props.rightAnswerOrder !== null && (props.order === props.rightAnswerOrder ? '#009800' : '#cb1010')
  )};
  background-color: ${props => (
    props.checked && props.rightAnswerOrder !== null && (props.order === props.rightAnswerOrder ? '#1dcb10' : 'red')
  )};
`;

const Text = styled.p`
  display: ${props => (props.show ? 'inline-block' : 'none')};
`;

function Option(props) {
  const {
    order,
    questionOrder,
    rightAnswerOrder,
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
        onClick={() => onClick(order)}
        checked={checked === order}
        order={order}
        rightAnswerOrder={rightAnswerOrder}
      >
        <CardBody className="text-center ">
          <Input
            addon
            type="radio"
            name={questionOrder}
            value={order}
            defaultChecked={checked === order}
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
  order: PropTypes.number.isRequired,
  questionOrder: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  rightAnswerOrder: PropTypes.number.isRequired,
  checked: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Option;
