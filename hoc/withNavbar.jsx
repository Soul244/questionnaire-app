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
    <ContainerStyled fluid className="h-100">
      <RowStyled>
        <ColStyled md="3" lg="2">
          <Sidebar items={[
            { name: 'Anketlerim', href: '/anket/anketlerim' },
          ]}
          />
        </ColStyled>
        <Col md="9" lg="10" className="my-2">
          <WrappedComponent {...props} />
        </Col>
      </RowStyled>
    </ContainerStyled>
  </>
);

export default withNavbar;
