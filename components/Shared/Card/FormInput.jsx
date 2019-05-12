import React from 'react';
import PropTypes from 'prop-types';

import {
  Card, CardTitle, FormGroup, Input,
} from 'reactstrap';
import { FormattedMessage } from 'react-intl';

function FormInput({ title, ...rest }) {
  return (
    <Card body className="br" data-test="form-input">
      <CardTitle data-test="title"><FormattedMessage id={title} /></CardTitle>
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
