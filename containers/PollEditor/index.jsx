import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Router from 'next/router';
import PropTypes from 'prop-types';

import { Container, Row, Col } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';

import Settings from './Settings';
import PollLast from './PollLast';
import PollHeader from './PollHeader';
import Inject from './Inject';
import SelectableLastMessage from './SelectableLastMessage';
import Questions from './Questions';
import { QuestionTool } from '../../components/Shared';
import { checkEmpty } from '../../validation/validationFunctions';

import * as pollActions from '../../redux/actions/pollActions';
import * as pollsActions from '../../redux/actions/pollsActions';
import withNavbar from '../../hoc/withNavbar';

@withNavbar
class PollEditor extends Component {
  componentWillMount() {
    const { slug, pollActions } = this.props;
    if (slug) {
      pollActions.getUpdatePoll(slug);
    }
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    if (!token && token === '') {
      Router.push({ pathname: '/giris-yap' });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { polls } = this.props;
    const { message } = polls;
    if (nextProps.polls.message !== message) {
      this.notify({ apiMessage: nextProps.polls.message });
    }
  }

  notify(messages) {
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
    if (messages.slugError) {
      toast.error('Anket adresini yazmadınız...', {
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
    const slugError = poll.slug === '';

    // If there is a error, won't post anything
    // If poll has id, update that poll
    // Otherwise post a new poll
    if (
      questionsErrors.length > 0
      || answersErrors.length > 0
      || settingsError
      || inputsErrors
      || slugError
    ) {
      this.notify({
        questionsErrors,
        answersErrors,
        settingsError,
        inputsErrors,
        slugError,
        handleOK: false,
      });
    } else if (poll.id === '') {
      postPoll(poll);
    } else {
      updatePoll(poll);
    }
  }

  render() {
    const { poll, pollActions } = this.props;
    const { name } = poll;
    const { addQuestion } = pollActions;
    return (
      <>
        <Container className="my-4">
          <Row>
            <Col md={12}>
              <div dangerouslySetInnerHTML={{ __html: name }} />
              <hr />
            </Col>
          </Row>
          <Row>
            <ToastContainer autoClose={3000} />
          </Row>
          <Row>
            <Col md={12}>
              <form onSubmit={this.handleSubmit}>
                <QuestionTool addQuestion={addQuestion} />
                <PollHeader />
                <PollLast />
                <Inject />
                <Settings />
                {poll.settings.type === 'test' && <SelectableLastMessage />}
                <Questions />
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
  poll: PropTypes.object.isRequired,
  polls: PropTypes.object.isRequired,
  pollsActions: PropTypes.shape({
    updatePoll: PropTypes.func.isRequired,
    postPoll: PropTypes.func.isRequired,
  }).isRequired,
  pollActions: PropTypes.shape({
    addQuestion: PropTypes.func.isRequired,
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
