import React from 'react';
import PropTypes from 'prop-types';

import {
  Card, CardBody, CardHeader, Col,
} from 'reactstrap';
import styled from 'styled-components';

import { ContentViewer } from '~Shared';

const DescContainer = styled.div`
  margin: 1rem 0;
`;

function Question({
  type, content, questionIndex, desc,
}) {
  return (
    <Col md={12}>
      <Card className="text-center">
        <CardHeader tag="h6">
          <p>{`SORU ${questionIndex + 1}`}</p>
        </CardHeader>
        <CardBody>
          <ContentViewer type={type} content={content} />
          <br />
          {desc && (
            <DescContainer>
              {desc}
            </DescContainer>
          )}
        </CardBody>
      </Card>
    </Col>
  );
}

Question.defaultProps = {
  desc: '',
};

Question.propTypes = {
  type: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  questionIndex: PropTypes.number.isRequired,
  desc: PropTypes.string,
};

export default Question;
