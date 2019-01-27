import React, { Component } from 'react';
import dynamic from 'next/dynamic';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  Card, CardBody, CardTitle, FormGroup, Input,
} from 'reactstrap';

import * as pollActions from '../../redux/actions/pollActions';

class Inject extends Component {
  render() {
    const { css, js } = this.props.poll;
    return (
        <>
          <Card>
            <CardBody>
              <CardTitle tag="h5">Özel CSS Kodu</CardTitle>
              <FormGroup>
                <Input
                  type="textarea"
                  value={css}
                  onChange={e => this.props.handleCssOnChange(e.target.value)}
                  placeholder="Css kodunuzu giriniz..."
                />
              </FormGroup>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <CardTitle tag="h5">Özel Javascript Kodu</CardTitle>
              <FormGroup>
                <Input
                  type="textarea"
                  value={js}
                  onChange={e => this.props.handleJsOnChange(e.target.value)}
                  placeholder="Javascript kodunuzu giriniz..."
                />
              </FormGroup>
            </CardBody>
          </Card>
        </>
    );
  }
}

Inject.propTypes = {
  handleCssOnChange: PropTypes.func.isRequired,
  handleJsOnChange: PropTypes.func.isRequired,
};


function mapStateToProps(state) {
  return {
    poll: state.poll,
  };
}

export default connect(
  mapStateToProps,
  pollActions,
)(Inject);
