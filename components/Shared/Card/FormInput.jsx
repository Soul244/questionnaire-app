import React from 'react';
import PropTypes from 'prop-types';

import {
  Card, CardTitle, FormGroup, Input,
} from 'reactstrap';

function FormInput(props) {
  const { title, ...rest } = props;
  return (
    <Card body className="mb-2 br" data-test="form-input">
      <CardTitle data-test="title">{title}</CardTitle>
      <FormGroup>
        <Input {...rest} />
      </FormGroup>
    </Card>
  );
}

FormInput.defaultProps = {
  title: '',
};

FormInput.propTypes = {
  title: PropTypes.string,
};

export default FormInput;
