import React from 'react';

import styled from 'styled-components';
import Icon, {
  arrowLeft,
} from '../../css/icons';

const Container = styled.div`
  display:flex;
  flex-direction:column;
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 120px;
  align-items: center;
  z-index: 99;
  background-color: #E3E3E3;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
  :hover {
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
}
`;

const TextStyled = styled.p`
  word-break: break-word;
  padding: 0.2rem;
`;

const Centered = styled.div`
  margin: auto 0;
  text-align:center;
`;

function PreviewControls() {
  return (
    <Container onClick={() => { window.history.back(); }}>
      <Centered>
        <TextStyled>Anket Oluşturma Sayfasına Geri Dön</TextStyled>
        <Icon size="48px" icon={arrowLeft} />
      </Centered>
    </Container>
  );
}

export default PreviewControls;
