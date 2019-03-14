import React from 'react';
import PropTypes from 'prop-types';

import {
  Button, UncontrolledTooltip,
} from 'reactstrap';
import styled from 'styled-components';

import Icon from '../../../css/icons';

const ButtonStyled = styled(Button)`
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Text = styled.p` 
  margin: 0 0 0 0.5rem;
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
        <Text>
          {content && (
          <>{content}</>
          )}
        </Text>
      </ButtonStyled>
      <UncontrolledTooltip placement="left" target={rest.id}>{tooltip}</UncontrolledTooltip>
    </>
  );
}

export default ToolButton;
