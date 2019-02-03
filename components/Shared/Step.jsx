import React from 'react';

import styled from 'styled-components';

const CenteredContainer = styled.div` 
    margin:1rem 0;
    h6,p {
        text-align: center;
        width:100%;
    }
`;

function Step(props) {
  return (
    <div>
      <CenteredContainer>
        <h6>{props.header}</h6>
        <p>{props.desc}</p>
      </CenteredContainer>
      {props.children}
    </div>
  );
}

export default Step;
