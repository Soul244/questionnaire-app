import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import colors from '~css/colors';

const Container = styled.div`
  display: flex;
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  border-radius:8px;
`;

const RightContainer = styled.div`
  margin-left: auto;
  display: flex;
  
`;

const Title = styled.h4`
  color: ${colors.color3};
  margin:0;
`;

function SectionHeader({ title, children }) {
  return (
    <Container>
      <Title>{title}</Title>
      <RightContainer>
        {children}
      </RightContainer>
    </Container>
  );
}

SectionHeader.defaultProps = {
  children: null,
};

SectionHeader.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.any,
};

export default SectionHeader;
