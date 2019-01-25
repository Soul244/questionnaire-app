import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

const InputStyled = styled.input` 
    border: 0 !important;
    border-bottom: 1px solid #ced4da !important;
    border-radius: 0px !important;
    box-shadow: none; 
    transition: .5s;
    padding: 0 !important;
    width: 100%;
    border-color: ${props => (props.error ? 'red !important' : '')};
`;

const LabelStyled = styled.label` 
    top: ${props => (props.value !== '' ? '-25px' : '0px')};
    position: absolute;
    left: 0px;
    bottom: 0px;
    font-size: 1rem;
    transition: 0.5s;
    pointer-events: none;
    bottom: 1px;
    color: ${props => (props.error ? 'red !important' : '#999')};
    ${InputStyled}:focus & {
    top: -25px;
  }
`;

// i added margin-top because of absolute label
const Container = styled.div` 
    position: relative;
    margin-top: 25px;
    width: 100%;
`;

function CustomInput(props) {
  const {
    inputLabel, value, error, ...rest
  } = props;
  return (
    <Container>
      <InputStyled
        {...rest}
        error={error}
      />
      <LabelStyled value={value} error={error}>
        {error && (
          error
        )}
        {!error && (
          inputLabel
        )}
      </LabelStyled>
    </Container>

  );
}

CustomInput.propTypes = {
  inputLabel: PropTypes.string.isRequired,
};

export default CustomInput;
