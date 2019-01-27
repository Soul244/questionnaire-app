import React from 'react';

import { UncontrolledTooltip } from 'reactstrap';
import styled from 'styled-components';

const Tooltip = styled(UncontrolledTooltip)` 
    padding: 0.25rem;
    div {
      background-color:rgba(15,25,65, 0.6);
    }
    .arrow::before {
      border-bottom-color: ${props => (props.placement === 'bottom' ? 'rgba(15,25,65, 0.6) ' : '')};
      border-top-color: ${props => (props.placement === 'top' ? 'rgba(15,25,65, 0.6) ' : '')};
      border-left-color: ${props => (props.placement === 'left' ? 'rgba(15,25,65, 0.6) ' : '')};
      border-right-color: ${props => (props.placement === 'right' ? 'rgba(15,25,65, 0.6) ' : '')};
    }
`;

function CustomTooltip({ text, placement, ...rest }) {
  return (
    <Tooltip {...rest} placement={placement}>{text}</Tooltip>
  );
}

export default CustomTooltip;
