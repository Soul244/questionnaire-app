import React from 'react';
import PropTypes from 'prop-types';

import {
  Card,
  CardBody,
  Col,
  Row,
} from 'reactstrap';
import styled from 'styled-components';
import CountUp from 'react-countup';

import { ContentViewer } from '../../Shared';

const CardStyled = styled(Card)`
  border-width: ${props => (props.checked ? '5px' : '0')};
  background-color: ${(props) => {
    const { checked, istrue } = props;
    if (checked && istrue) {
      return '#009800';
    }
    if (checked && !istrue) {
      return '#cb1010';
    }
    if (checked && istrue === null) {
      return 'lightgray';
    }
    return 'white';
  }};
  color: ${props => (props.checked ? 'white' : 'black')};
`;

const TextContainer = styled.div`
  display: ${props => (props.show ? 'block' : 'none')};
`;

function Option({
  answerIndex,
  type,
  content,
  checkedAnswerIndex,
  isTrue,
  onClick,
  answerCount,
  showPercent,
}) {
  return (
    <Col md={6}>
      <CardStyled
        className="my-1"
        onClick={() => onClick(answerIndex)}
        checked={checkedAnswerIndex === answerIndex}
        istrue={isTrue}
      >
        <CardBody className="text-center ">
          <Row>
            <Col sm={2}>
              <TextContainer show={showPercent}>
                <CountUp end={answerCount} />
                {' '}
                {'kişi'}
              </TextContainer>
            </Col>
            <Col sm={checkedAnswerIndex === null ? { size: 12 } : { size: 10 }} className="text-center">
              <ContentViewer type={type} content={content} />
            </Col>
          </Row>
        </CardBody>
      </CardStyled>
    </Col>
  );
}

Option.defaultProps = {
  checkedAnswerIndex: null,
};

Option.propTypes = {
  type: PropTypes.string.isRequired,
  answerIndex: PropTypes.number.isRequired,
  content: PropTypes.string.isRequired,
  checkedAnswerIndex: PropTypes.number,
  onClick: PropTypes.func.isRequired,
  answerCount: PropTypes.number.isRequired,
  showPercent: PropTypes.bool.isRequired,
  isTrue: PropTypes.bool.isRequired,
};

export default Option;
