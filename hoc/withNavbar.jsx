import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Navbar, Sidebar } from '../components/Shared';

const withNavbar = WrappedComponent => props => (
  <>
    <Navbar />
    <Container className="my-2">
      <Row>
        <Col md="3">
          <Sidebar items={[
            { name: 'Anketlerim', href: '/anket/anketlerim' },
          ]}
          />
        </Col>
        <Col md="9">
          <WrappedComponent {...props} />
        </Col>
      </Row>
    </Container>
  </>
);

export default withNavbar;
