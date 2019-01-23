import React from 'react';
import PropTypes from 'prop-types';

import {
  Button, Card, CardBody,
} from 'reactstrap';

class First extends React.Component {
  constructor() {
    super();
    this.state = {
      desc: '',
      name: '',
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState !== null && nextProps.desc !== prevState.desc) {
      return ({
        desc: nextProps.desc,
      });
    }
    if (prevState !== null && nextProps.name !== prevState.name) {
      return ({
        name: nextProps.name,
      });
    }
    return {};
  }

  render() {
    const {
      props,
    } = this;

    const { name, desc, handleTestStarted } = props;
    return (
      <Card>
        <CardBody className="text-center">
          <div dangerouslySetInnerHTML={{ __html: name }} />
          <div dangerouslySetInnerHTML={{ __html: desc }} />
          <Button onClick={handleTestStarted}>Teste Başla</Button>
        </CardBody>
      </Card>
    );
  }
}

First.propTypes = {
  name: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  handleTestStarted: PropTypes.func.isRequired,
};

export default First;
