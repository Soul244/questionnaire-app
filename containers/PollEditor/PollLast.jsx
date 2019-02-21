import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
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
  static propTypes = {
    poll: PropTypes.shape({
      lastDesc: PropTypes.string,
    }).isRequired,
    pollActions: PropTypes.shape({
      handleLastDescOnChange: PropTypes.func.isRequired,
    })
  }
  configText = {
    placeholderText: 'Anket sonu başlığınızı giriniz...',
    heightMin: 100,
    heightMax: 400,
    iframe: true,
    tabSpaces: 4,
    toolbarSticky: false,
    imageUploadRemoteUrls: false,
    pluginsEnabled: ['align', 'charCounter', 'codeBeautifier', 'codeView', 'colors', 'draggable', 'embedly', 'emoticons', 'entities', 'file', 'fontFamily', 'fontSize', 'fullscreen', 'image', 'imageManager', 'inlineStyle', 'lineBreaker', 'link', 'lists', 'paragraphFormat', 'paragraphStyle', 'quickInsert', 'quote', 'save', 'table', 'url', 'video', 'wordPaste'],
    toolbarButtons: ['fullscreen', 'bold', 'italic', 'underline', '|', 'fontFamily', 'fontSize', 'color', 'inlineClass', 'inlineStyle', 'paragraphStyle', 'lineHeight', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', '-', 'insertLink', 'insertImage', 'insertVideo', 'embedly', 'insertTable', '|', 'emoticons', 'fontAwesome', 'specialCharacters', 'selectAll', 'clearFormatting', '|', 'print', 'spellChecker', 'html', '|', 'undo', 'redo'],
  };
  
  onLastDescChange = lastDescContent => {
    const {handleLastDescOnChange} = this.props.pollActions;
    handleLastDescOnChange(lastDescContent);
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

const mapStateToProps = state => ({
  poll: state.poll,
})

const mapDispatchToProps = dispatch => ({
  pollActions: bindActionCreators(pollActions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PollLast);
