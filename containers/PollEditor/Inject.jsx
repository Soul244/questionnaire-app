import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import {
  Card, CardBody, CardTitle, FormGroup, Input,
} from 'reactstrap';

import * as pollActions from '../../redux/actions/pollActions';


function Inject(props) {
  const { css, js } = props.poll;
  const { onChangeCss, onChangeJs } = props.pollActions;
  return (
    <>
      <CardTitle tag="h5">Özel CSS Kodu</CardTitle>
      <FormGroup>
        <Input
          type="textarea"
          value={css}
          onChange={e => onChangeCss(e.target.value)}
          placeholder="Css kodunuzu giriniz..."
        />
      </FormGroup>
      <CardTitle tag="h5">Özel Javascript Kodu</CardTitle>
      <FormGroup>
        <Input
          type="textarea"
          value={js}
          onChange={e => onChangeJs(e.target.value)}
          placeholder="Javascript kodunuzu giriniz..."
        />
      </FormGroup>
    </>
  );
}

Inject.propTypes = {
  pollActions: PropTypes.shape({
    onChangeCss: PropTypes.func.isRequired,
    onChangeJs: PropTypes.func.isRequired,
  }),
};

const mapStateToProps = state => ({
  poll: state.poll,
});

const mapDispatchToProps = dispatch => ({
  pollActions: bindActionCreators(pollActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Inject);
