import React from 'react';
import styled from 'styled-components';
import { Button, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import colors from '~css/colors';

const CountContainer = styled.div`
border: 1px solid transparent;
padding: 0.375rem 0.75rem;
background-color: ${colors.color10};
border-radius: 50px;
text-align: center;
font-size: 1rem;
font-weight: 500;
`;

const RightContainer = styled.div`
margin-left: auto;
display: flex;
`;

function Controls({
  slidePrev, slideNext, questionsLength, slideIndex,
}) {
  return (
    <Col>
      <Controls>
        <Button onClick={slidePrev}>Önceki Soru</Button>
        <RightContainer>
          <CountContainer color="secondary">
            {`${slideIndex + 1}/${questionsLength} soru`}
          </CountContainer>
          <Button onClick={slideNext}>Sıradaki Soru</Button>
        </RightContainer>
      </Controls>
    </Col>
  );
}

Controls.propTypes = {
  slidePrev: PropTypes.func.isRequired,
  slideNext: PropTypes.func.isRequired,
  questionsLength: PropTypes.number.isRequired,
  slideIndex: PropTypes.number.isRequired,
};

export default Controls;
