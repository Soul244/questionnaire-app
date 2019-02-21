import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { Card, CardBody, CardTitle, FormGroup, Input } from 'reactstrap';

import * as pollActions from '../../redux/actions/pollActions';

class Inject extends Component {
  static propTypes = {
    pollActions: PropTypes.shape({
      handleCssOnChange: PropTypes.func.isRequired,
      handleJsOnChange: PropTypes.func.isRequired
    })
  }
  render() {
    const { css, js } = this.props.poll;
    const { handleCssOnChange, handleJsOnChange } = this.props.pollActions;
    return (
      <>
        <Card>
          <CardBody>
            <CardTitle tag="h5">Özel CSS Kodu</CardTitle>
            <FormGroup>
              <Input
                type="textarea"
                value={css}
                onChange={e => handleCssOnChange(e.target.value)}
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
                onChange={e => handleJsOnChange(e.target.value)}
                placeholder="Javascript kodunuzu giriniz..."
              />
            </FormGroup>
          </CardBody>
        </Card>
      </>
    );
  }
}

const mapStateToProps = state => ({
  poll: state.poll,
})

const mapDispatchToProps = dispatch => ({
  pollActions: bindActionCreators(pollActions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Inject);
