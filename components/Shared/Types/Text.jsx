import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledText = styled.p` 
    display: inline-block;
`;

const Text = ({ children }) => <StyledText>{children}</StyledText>;

export default Text;
