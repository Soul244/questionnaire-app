import React from 'react';
import PropTypes from 'prop-types';

import {
  Card, CardTitle, FormGroup, Input,
} from 'reactstrap';

function FormInput(props) {
  const { title, ...rest } = props;
  return (
    <Card body className="mb-2 br">
      <CardTitle>{title}</CardTitle>
      <FormGroup>
        <Input
          value={rest.value}
          onChange={rest.onChange}
          placeholder={rest.placeholder}
        />
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
