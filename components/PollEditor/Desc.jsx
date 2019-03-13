import React from 'react';
import PropTypes from 'prop-types';

import { Input } from 'reactstrap';
import styled from 'styled-components';

const InputStyled = styled(Input)`
    display:${props => (props.show ? 'block' : 'none')};
`;

function Desc({
  type, show, value, onChange,
}) {
  if (type === 'audio' || type === 'video' || type === 'gif' || type === 'image') {
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

Desc.propTypes = {
  type: PropTypes.string.isRequired,
  show: PropTypes.number.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Desc;
