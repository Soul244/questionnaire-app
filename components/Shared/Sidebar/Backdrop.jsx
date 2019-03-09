import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
 position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 100;
`;

function Backdrop({ onClick }) {
  return <Container onClick={onClick} />;
}

export default Backdrop;
