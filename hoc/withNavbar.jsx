import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import styled from 'styled-components';

import { Navbar, Sidebar } from '../components/Shared';

const ContainerStyled = styled(Container)`
  padding-left: 0px;
  padding-right: 0px;
`;

const ColStyled = styled(Col)`
  padding: 0px !important;
`;

const RowStyled = styled(Row)`
  height: 100%;
`;

const withNavbar = WrappedComponent => props => (
  <>
    <Navbar />
    <ContainerStyled className="h-100">
      <RowStyled>
        <Col className="my-2">
          <WrappedComponent {...props} />
        </Col>
      </RowStyled>
    </ContainerStyled>
  </>
);

export default withNavbar;
