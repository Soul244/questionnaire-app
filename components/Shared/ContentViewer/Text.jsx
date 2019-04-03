import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledText = styled.p` 
    display: inline-block;
    margin-bottom:0;
`;

const Text = ({ content }) => (
  <StyledText data-test="text-self">
    {content}
  </StyledText>
);

Text.propTypes = { content: PropTypes.string.isRequired };

export default Text;
