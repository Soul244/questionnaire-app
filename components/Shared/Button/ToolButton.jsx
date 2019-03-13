import React from 'react';
import PropTypes from 'prop-types';

import {
  Button, UncontrolledTooltip,
} from 'reactstrap';
import styled from 'styled-components';

import Icon from '../../../css/icons';

const ButtonStyled = styled(Button)`
  width: 40px;
  height: 40px;
  margin: 0 auto;
  display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
function ToolButton(props) {
  const {
    icon, content, tooltip, ...rest
  } = props;
  return (
    <>
      <ButtonStyled size="md" outline block {...rest}>
        {icon && (
        <Icon size="24px" icon={icon} />
        )}
        {content && (
        <>{content}</>
        )}
      </ButtonStyled>
      <UncontrolledTooltip placement="left" target={rest.id}>{tooltip}</UncontrolledTooltip>
    </>
  );
}

export default ToolButton;
