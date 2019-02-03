import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Router from 'next/router';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';

import {
  Container, Row, Col,
} from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';

import Questions from './Questions';
import Settings from './Settings';
import PollLast from './PollLast';
import PollHeader from './PollHeader';
import Inject from './Inject';
import SelectableLastMessage from './SelectableLastMessage';

import { QuestionTool, StepWizardNav, Step } from '../../components/Shared';
import * as pollActions from '../../redux/actions/pollActions';
import * as pollsActions from '../../redux/actions/pollsActions';
import { checkEmpty } from '../../validation/validationFunctions';

const StepWizard = dynamic(import('react-step-wizard'), {
  ssr: false,
});

class PollEditor extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    if (this.props.slug) {
      this.props.pollActions.getUpdatePoll(this.props.slug);
    }
  }

  componentDidMount() {
    if (this.props.slug) {
      this.props.pollActions.getUpdatePoll(this.props.slug);
    }
    const auth = localStorage.getItem('auth');
    if (auth === '' || auth === null) {
      Router.push({ pathname: '/giris-yap' });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.polls.message !== this.props.polls.message) {
      this.notify({ apiMessage: nextProps.polls.message });
    }
  }

  notify = (errors) => {
    if (errors.questionsErrors) {
      errors.questionsErrors.map(error => (
        toast.error(`${error.order + 1}. sorununun içeriği eksik`, { position: toast.POSITION.BOTTOM_LEFT })
      ));
    }
    if (errors.answersErrors) {
      errors.answersErrors.map(error => (
        toast.error(`${error.questionOrder + 1}. sorununun ${error.order + 1} cevabının içeriği eksik`, { position: toast.POSITION.BOTTOM_LEFT })
      ));
    }
    if (errors.settingsError) {
      toast.error('Ayarları Tamamlamadınız...', { position: toast.POSITION.BOTTOM_LEFT });
    }
    if (errors.inputsErrors) {
      toast.error('Anket ismini yazmadınız...', { position: toast.POSITION.BOTTOM_LEFT });
    }
    if (errors.slugError) {
      toast.error('Anket adresini yazmadınız...', { position: toast.POSITION.BOTTOM_LEFT });
    }
    if (errors.apiMessage) {
      if (errors.apiMessage === 'Anket Kaydedildi' || errors.apiMessage === 'Anket Güncellendi') {
        toast.success(errors.apiMessage, { position: toast.POSITION.BOTTOM_LEFT });
      } else {
        toast.error(errors.apiMessage, { position: toast.POSITION.BOTTOM_LEFT });
      }
    }
  };

  handleSubmit(e) {
    e.preventDefault();
    const { postPoll, updatePoll } = this.props.pollsActions;
    const { poll } = this.props;
    // Errors
    const questionsErrors = checkEmpty(poll.questions);
    const answersErrors = checkEmpty(poll.answers);
    const settingsError = false;// checkObjectEmpty(poll.settings);
    const inputsErrors = poll.name === '';
    const slugError = poll.slug === '';

    // If there is a error, won't post anything
    // If poll has id, update that poll
    // Otherwise post a new poll
    if (questionsErrors.length > 0 || answersErrors.length > 0 || settingsError
      || inputsErrors || slugError) {
      this.notify({
        questionsErrors, answersErrors, settingsError, inputsErrors, slugError, handleOK: false,
      });
    } else if (poll.id === '') {
      postPoll(poll);
    } else {
      updatePoll(poll);
    }
  }

  render() {
    const { poll } = this.props;
    const {
      questions,
      lastDesc,
      js,
      css,
    } = poll;

    const {
      handleAddQuestion,
      handleDeleteQuestion,
      handleUpdateQuestionOrder,
      handleLastDescOnChange,
      handleCssOnChange,
      handleJsOnChange,
    } = this.props.pollActions;

    return (
      <>
        <Container className="my-4">
          <Row>
            <Col md={12}>
              <div dangerouslySetInnerHTML={{ __html: this.props.poll.name }} />
              <hr />
            </Col>
          </Row>
          <Row>
            <ToastContainer autoClose={3000} />
          </Row>
          <Row>
            <Col md={12}>
              <form onSubmit={this.handleSubmit}>
                <StepWizard nav={<StepWizardNav />}>
                  <Step header="Adım 1" desc="Anket adını, anket açıklamasını, anket linkini ve anket sonu mesajını girin">
                    <PollHeader />
                    <PollLast handleLastDescOnChange={handleLastDescOnChange} lastDesc={lastDesc} />
                  </Step>
                  <Step header="Adım 2" desc="Custom Css ve Javascript kodlarınızı ekleyin">
                    <Inject
                      js={js}
                      css={css}
                      handleJsOnChange={handleJsOnChange}
                      handleCssOnChange={handleCssOnChange}
                    />
                  </Step>
                  <Step header="Adım 3" desc="Anket ayarlarını girin">
                    {' '}
                    <Settings />
                    {poll.settings.type === 'test' && (
                    <SelectableLastMessage />
                    )}
                  </Step>
                  <Step header="Adım 4" desc="Anket sorularınızı ve cevaplarınızı girin">
                    <QuestionTool addQuestion={handleAddQuestion} />
                    <Questions
                      deleteQuestion={handleDeleteQuestion}
                      questions={questions}
                      updateQuestionOrder={handleUpdateQuestionOrder}
                    />
                  </Step>
                </StepWizard>
              </form>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

PollEditor.defaultProps = {
  slug: null,
};

PollEditor.propTypes = {
  slug: PropTypes.string,
  polls: PropTypes.object.isRequired,
  pollsActions: PropTypes.shape({
    updatePoll: PropTypes.func.isRequired,
    postPoll: PropTypes.func.isRequired,
  }).isRequired,
  pollActions: PropTypes.shape({
    getUpdatePoll: PropTypes.func.isRequired,
    handleAddQuestion: PropTypes.func.isRequired,
    handleDeleteQuestion: PropTypes.func.isRequired,
    handleUpdateQuestionOrder: PropTypes.func.isRequired,
    handleNameOnChange: PropTypes.func.isRequired,
    handleDescOnChange: PropTypes.func.isRequired,
    handleLastDescOnChange: PropTypes.func.isRequired,
    handleSlugOnChange: PropTypes.func.isRequired,
    handleCssOnChange: PropTypes.func.isRequired,
    handleJsOnChange: PropTypes.func.isRequired,
  }).isRequired,
  poll: PropTypes.shape({
    name: PropTypes.string.isRequired,
    desc: PropTypes.string,
    lastDesc: PropTypes.string,
    js: PropTypes.string,
    css: PropTypes.string,
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
