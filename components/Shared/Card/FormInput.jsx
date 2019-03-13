import React from 'react';
import PropTypes from 'prop-types';

import {
  Card, CardTitle, FormGroup, Input,
} from 'reactstrap';
import styled from 'styled-components';

const CardStyled = styled(Card)` 
`;

function FormInput({ title, ...rest }) {
  return (
    <CardStyled body className="br" data-test="form-input">
      <CardTitle data-test="title">{title}</CardTitle>
      <FormGroup>
        <Input {...rest} />
      </FormGroup>
    </CardStyled>
  );
}

FormInput.defaultProps = {
  title: '',
};

FormInput.propTypes = {
  title: PropTypes.string,
};

export default FormInput;
