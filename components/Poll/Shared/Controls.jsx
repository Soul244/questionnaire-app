import React from 'react';
import styled from 'styled-components';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';

const CountContainer = styled.div`
border: 1px solid transparent;
padding: 0.375rem 0.75rem;
background-color: lightsteelblue;
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
    <Controls>
      <Button onClick={slidePrev}>Önceki Soru</Button>
      <RightContainer>
        <CountContainer color="secondary">
          {`${slideIndex + 1}/${questionsLength} soru`}
        </CountContainer>
        <Button onClick={slideNext}>Sıradaki Soru</Button>
      </RightContainer>
    </Controls>
  );
}

Controls.propTypes = {
  slidePrev: PropTypes.func.isRequired,
  slideNext: PropTypes.func.isRequired,
  questionsLength: PropTypes.number.isRequired,
  slideIndex: PropTypes.number.isRequired,
};

export default Controls;
