import React from 'react';
import { connect } from 'react-redux';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';

import {
  Card, CardBody, FormGroup, CardTitle,
} from 'reactstrap';

import * as pollActions from '../../redux/actions/pollActions';

/*
  Froala editor uses window object.
  At the first load, NEXT JS rendering pages on server side.
  So, components cant reach window object. To access window object,
  we should use Next Js's dynamic function.
*/
const FroalaEditorInput = dynamic(import('react-froala-wysiwyg'), {
  ssr: false,
});

class PollLast extends React.Component {
  configText = {
    placeholderText: 'Anket sonu başlığınızı giriniz...',
    heightMin: 100,
    heightMax: 400,
    iframe: true,
    tabSpaces: 4,
    toolbarSticky: false,
    pluginsEnabled: ['align', 'charCounter', 'codeBeautifier', 'codeView', 'colors', 'draggable', 'embedly', 'emoticons', 'entities', 'file', 'fontFamily', 'fontSize', 'fullscreen', 'image', 'imageManager', 'inlineStyle', 'lineBreaker', 'link', 'lists', 'paragraphFormat', 'paragraphStyle', 'quickInsert', 'quote', 'save', 'table', 'url', 'video', 'wordPaste'],
    toolbarButtons: ['fullscreen', 'bold', 'italic', 'underline', '|', 'fontFamily', 'fontSize', 'color', 'inlineClass', 'inlineStyle', 'paragraphStyle', 'lineHeight', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', '-', 'insertLink', 'insertImage', 'insertVideo', 'embedly', 'insertTable', '|', 'emoticons', 'fontAwesome', 'specialCharacters', 'selectAll', 'clearFormatting', '|', 'print', 'spellChecker', 'html', '|', 'undo', 'redo'],
  };

  constructor(props) {
    super(props);
    this.onLastDescChange = this.onLastDescChange.bind(this);
  }

  onLastDescChange(lastDescContent) {
    this.props.handleLastDescOnChange(lastDescContent);
  }

  render() {
    const { lastDesc } = this.props.poll;
    return (
      <Card>
        <CardBody>
          <CardTitle tag="h5">Anket Sonu Mesajı</CardTitle>
          <FormGroup>
            <FroalaEditorInput
              tag="textarea"
              config={this.configText}
              model={lastDesc}
              onModelChange={this.onLastDescChange}
            />
          </FormGroup>
        </CardBody>
      </Card>
    );
  }
}

PollLast.propTypes = {
  poll: PropTypes.shape({
    lastDesc: PropTypes.string,
  }).isRequired,
  handleLastDescOnChange: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    poll: state.poll,
  };
}

export default connect(
  mapStateToProps,
  pollActions,
)(PollLast);
