import React from 'react';
import Proptypes from 'prop-types';
import styled from 'styled-components';
import { Row, Col } from 'reactstrap';

const Container = styled.div`
    background-color: rgba(0,159,212,0.1);
  border-radius:8px;
`;

const H2 = styled.h2`
   color: #009fd4;
`;

function PageHeader({ title }) {
  return (
    <Row>
      <Col md="12">
        <Container>
          <H2 className="py-4 px-4 my-2">{title}</H2>
        </Container>
      </Col>
    </Row>
  );
}

PageHeader.propTypes = {
  title: Proptypes.string.isRequired,
};

export default PageHeader;
