import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin-top: 8rem;
`;

function Loading() {
  return (
    <Container>
      <div className="lds-ellipsis">
        <div />
        <div />
        <div />
        <div />
      </div>
    </Container>
  );
}

export default Loading;
