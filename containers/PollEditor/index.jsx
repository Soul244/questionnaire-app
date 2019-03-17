import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import {
  Row, Col,
} from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';

import Settings from './Settings';
import Questions from './Questions';
import {
  QuestionTool, FormInput, FormEditor,
} from '../../components/Shared';
import { checkEmpty } from '../../validation/validationFunctions';

import * as pollActions from '../../redux/actions/pollActions';
import * as pollsActions from '../../redux/actions/pollsActions';
import withNavbar from '../../hoc/withNavbar';

@withNavbar
class PollEditor extends Component {
  config = {
    placeholderText: 'Anket açıklamanızı giriniz...',
    heightMin: 100,
    heightMax: 400,
    iframe: true,
    toolbarSticky: false,
    imageUploadRemoteUrls: false,
    tabSpaces: 4,
    pluginsEnabled: ['align', 'charCounter', 'codeBeautifier', 'codeView', 'colors', 'draggable', 'embedly', 'emoticons', 'entities', 'file', 'fontFamily', 'fontSize', 'fullscreen', 'image', 'imageManager', 'inlineStyle', 'lineBreaker', 'link', 'lists', 'paragraphFormat', 'paragraphStyle', 'quickInsert', 'quote', 'save', 'table', 'url', 'video', 'wordPaste'],
    toolbarButtons: ['fullscreen', 'bold', 'italic', 'underline', '|', 'fontFamily', 'fontSize', 'color', 'inlineClass', 'inlineStyle', 'paragraphStyle', 'lineHeight', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', '-', 'insertLink', 'insertImage', 'insertVideo', 'embedly', 'insertTable', '|', 'emoticons', 'fontAwesome', 'specialCharacters', 'selectAll', 'clearFormatting', '|', 'print', 'spellChecker', 'html', '|', 'undo', 'redo'],
  };

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


  componentWillMount() {
    const { _id, pollActions } = this.props;
    if (_id) {
      pollActions.getUpdatePoll(_id);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { polls } = this.props;
    const { message } = polls;
    if (nextProps.polls.message !== message) {
      this.notify({ apiMessage: nextProps.polls.message });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { pollsActions } = this.props;
    const { postPoll, updatePoll } = pollsActions;
    const { poll } = this.props;
    // Errors
    const questionsErrors = checkEmpty(poll.questions);
    const answersErrors = checkEmpty(poll.answers);
    const settingsError = false; // checkObjectEmpty(poll.settings);
    const inputsErrors = poll.name === '';

    // If there is a error, won't post anything
    // If poll has id, update that poll
    // Otherwise post a new poll
    if (
      questionsErrors.length > 0
      || answersErrors.length > 0
      || settingsError
      || inputsErrors
    ) {
      this.notify({
        questionsErrors,
        answersErrors,
        settingsError,
        inputsErrors,
        handleOK: false,
      });
    } else if (poll.id === '') {
      postPoll(poll);
    } else {
      updatePoll(poll);
    }
  }

  notify=(messages) => {
    if (messages.questionsErrors) {
      messages.questionsErrors.map(error => toast.error(`${error.index + 1}. sorununun içeriği eksik`, {
        position: toast.POSITION.BOTTOM_LEFT,
      }));
    }
    if (messages.answersErrors) {
      messages.answersErrors.map(error => toast.error(
        `${error.questionIndex + 1}. sorununun ${error.index
            + 1} cevabının içeriği eksik`,
        { position: toast.POSITION.BOTTOM_LEFT },
      ));
    }
    if (messages.settingsError) {
      toast.error('Ayarları Tamamlamadınız...', {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    }
    if (messages.inputsErrors) {
      toast.error('Anket ismini yazmadınız...', {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    }
    if (messages.apiMessage) {
      if (
        messages.apiMessage === 'Anket Kaydedildi'
        || messages.apiMessage === 'Anket Güncellendi'
      ) {
        toast.success(messages.apiMessage, {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      } else {
        toast.error(messages.apiMessage, {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      }
    }
  }

  render() {
    const { poll, pollActions } = this.props;
    const {
      addQuestion,
      onChangeName,
      onChangeDesc,
      onChangeLastDesc,
    } = pollActions;

    const {
      name,
      desc,
      lastDesc,
    } = poll;
    return (
      <>
        <ToastContainer autoClose={3000} />
        <form onSubmit={this.handleSubmit}>
          <QuestionTool addQuestion={addQuestion} />
          <Row>
            <Col md="12" className="mb-2">
              <FormInput
                title="Anket Başlığı"
                value={name}
                onChange={e => onChangeName(e.target.value)}
                placeholder="Anket başlığınızı giriniz..."
              />
            </Col>
          </Row>
          <Row>
            <Col md="12" className="mb-2">
              <FormEditor
                title="Anket Açıklaması"
                config={this.config}
                model={desc}
                onModelChange={onChangeDesc}
              />
            </Col>
            <Col md="12" className="mb-2">
              <FormEditor
                title="Anket Sonu Mesajı"
                config={this.configText}
                model={lastDesc}
                onModelChange={onChangeLastDesc}
              />
            </Col>
          </Row>
          <Row>
            <Col md="12" className="mb-2">
              <Settings />
            </Col>
          </Row>

          {/* <Inject /> */}
          {/* {poll.settings.type === 'test' && <SelectableLastMessage />} */}
          <Row>
            <Col md="12" className="mb-2">
              <Questions />
            </Col>
          </Row>
        </form>
      </>
    );
  }
}

PollEditor.propTypes = {
  polls: PropTypes.object.isRequired,
  poll: PropTypes.shape({
    name: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
  }).isRequired,
  pollActions: PropTypes.shape({
    updatePoll: PropTypes.func.isRequired,
    postPoll: PropTypes.func.isRequired,
    addQuestion: PropTypes.func.isRequired,
    onChangeName: PropTypes.func.isRequired,
    onChangeDesc: PropTypes.func.isRequired,
  }).isRequired,
};

function mapStateToProps(state) {
  return {
    poll: state.poll,
    polls: state.polls,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    pollActions: bindActionCreators(pollActions, dispatch),
    pollsActions: bindActionCreators(pollsActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PollEditor);
