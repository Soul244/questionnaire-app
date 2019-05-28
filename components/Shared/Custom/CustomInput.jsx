import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import colors from '~css/colors';

const InputStyled = styled.input` 
    border: 0 !important;
    border-bottom: 1px solid #ced4da !important;
    border-radius: 0px !important;
    box-shadow: none; 
    transition: .5s;
    padding: 0 !important;
    width: 100%;
    border-color: ${props => (props.error ? colors.wrongColor : '')};
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
    color: ${props => (props.error ? colors.wrongColor : '#999')};
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

function CustomInput({
  inputLabel, value, error, ...rest
}) {
  return (
    <Container data-test="container">
      <InputStyled
        {...rest}
        error={error}
        data-test="input"
      />
      <LabelStyled
        value={value}
        error={error}
        data-test="label"
      >
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

CustomInput.defaultProps = {
  value: '',
  error: null,
};

CustomInput.propTypes = {
  inputLabel: PropTypes.string.isRequired,
  value: PropTypes.string,
  error: PropTypes.any,
};

export default CustomInput;
