import React from 'react';
import { Button, Spinner } from 'reactstrap';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Icon, { done } from '~css/icons';

const SpinnerStyled = styled(Spinner)`
    margin-bottom: 4px;
    margin-right: 0.75rem;
`;

const IconContainer = styled.div`
    color: ${props => props.color};
    vertical-align: text-bottom;
    display:inline-block;
    margin: ${props => props.margin};
    cursor: pointer;
    margin-right: 0.75rem;
`;


function SpinnerButton({
  fetching, fetched, children, ...rest
}) {
  return (
    <Button {...rest}>
      {fetching && (
        <SpinnerStyled color="light" size="sm" />
      )}
      {fetched && (
      <IconContainer color="#f8f9fa">
        <Icon size={20} icon={done} />
      </IconContainer>
      )}
      {children}
    </Button>
  );
}

SpinnerButton.defaultProps = {
  children: null,
};

SpinnerButton.propTypes = {
  fetching: PropTypes.bool.isRequired,
  fetched: PropTypes.bool.isRequired,
  children: PropTypes.any,
};

export default SpinnerButton;
