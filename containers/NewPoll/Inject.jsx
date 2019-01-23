import React, { Component } from 'react';
import dynamic from 'next/dynamic';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  Card, CardBody, CardTitle, FormGroup, Input,
} from 'reactstrap';

import * as pollActions from '../../redux/actions/pollActions';

const FroalaEditorInput = dynamic(import('react-froala-wysiwyg'), {
  ssr: false,
});

class Inject extends Component {
  configCss = {
    placeholderText: 'Css kodunuzu giriniz...',
    heightMin: 100,
    heightMax: 400,
    iframe: true,
    tabSpaces: 4,
    toolbarSticky: false,
    pluginsEnabled: ['codeView'],
    toolbarButtons: ['print', 'spellChecker', 'html'],
  };

  configJs = {
    placeholderText: 'Javascript kodunuzu giriniz...',
    heightMin: 100,
    heightMax: 400,
    iframe: true,
    tabSpaces: 4,
    toolbarSticky: false,
    pluginsEnabled: ['codeView'],
    toolbarButtons: ['print', 'spellChecker', 'html'],
  };

  constructor(props) {
    super(props);
    this.onCssChange = this.onCssChange.bind(this);
    this.onJsChange = this.onJsChange.bind(this);
  }

  onCssChange(CssContent) {
    this.props.handleCssOnChange(CssContent);
  }

  onJsChange(JsContent) {
    this.props.handleJsOnChange(JsContent);
  }

  render() {
    const { css, js } = this.props.poll;
    return (
        <>
          <Card>
            <CardBody>
              <CardTitle tag="h5">Özel CSS Kodu</CardTitle>
              <FormGroup>
                <FroalaEditorInput
                  tag="textarea"
                  config={this.configCss}
                  model={css}
                  onModelChange={this.onCssChange}
                />
              </FormGroup>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <CardTitle tag="h5">Özel Javascript Kodu</CardTitle>
              <FormGroup>
                <FroalaEditorInput
                  tag="textarea"
                  config={this.configJs}
                  model={js}
                  onModelChange={this.onJsChange}
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
