import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Navbar } from '../components/Shared';

const withNavbar = WrappedComponent => props => (
  <>
    <Navbar />
    <Container className="h-100">
      <Row>
        <Col className="my-2">
          <WrappedComponent {...props} />
        </Col>
      </Row>
    </Container>
  </>
);

export default withNavbar;
