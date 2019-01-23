import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Input } from 'reactstrap';
import styled from 'styled-components';

const InputStyled = styled(Input)`
    display:${props => (props.show ? 'block' : 'none')};
`;

export default class Desc extends Component {
  render() {
    const {
      type, show, value, onChange,
    } = this.props;
    if (type === 'audio' || type === 'external-media' || type === 'gif' || type === 'image') {
      return (
        <InputStyled
          show={show}
          type="textarea"
          value={value}
          onChange={e => onChange(e)}
        />
      );
    }
    return <div />;
  }
}
