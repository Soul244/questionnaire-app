/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'next/router';
import PropTypes from 'prop-types';
import Parser from 'html-react-parser';

import {
  Container, Row, Col,
} from 'reactstrap';

import * as pollsActions from '../../redux/actions/pollsActions';
import * as participantActions from '../../redux/actions/participantActions';
import { Full, SideBySide, PollActive } from '../../components/Poll';

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      testStarted: false,
      testFinished: false,
    };
  }

  componentDidMount() {
    const { _id, isPreview, poll } = this.props;
    const { getPoll, getPreview } = this.props.pollsActions;
    if (!isPreview) {
      getPoll(_id);
    } else {
      getPreview(poll);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.polls.poll.js !== '') {
      this.jsInject(nextProps.polls.poll.js);
    }
    if (nextProps.polls.poll.css !== '') {
      this.cssInject(nextProps.polls.poll.css);
    }
  }

  handleTestStarted = () => {
    this.setState({
      testStarted: true,
    });
  }

  handleTestFinished = () => {
    this.setState({
      testFinished: true,
    });
  }

  jsInject(js) {
    const scriptTag = document.createElement('script');
    scriptTag.setAttribute('type', 'text/javascript');
    scriptTag.appendChild(document.createTextNode(js));
    document.getElementsByTagName('head')[0].appendChild(scriptTag);
  }

  cssInject(css) {
    const scriptTag = document.createElement('style');
    scriptTag.setAttribute('type', 'text/css');
    scriptTag.appendChild(document.createTextNode(css));
    document.getElementsByTagName('head')[0].appendChild(scriptTag);
  }

  render() {
    const { testStarted, testFinished } = this.state;
    const { participantActions, participant } = this.props;
    const { addParticipantAnswer, postParticipant } = participantActions;
    const { poll } = this.props.polls;
    const { settings } = poll;
    if (settings === undefined) return null;
    if (!settings.isPollActive) {
      return <PollActive />;
    }
    return (
      <>
        <Container className="my-4">
          {settings.showType === 'sideBySide' && (
          <SideBySide
            testStarted={testStarted}
            testFinished={testFinished}
            poll={poll}
            handleTestStarted={this.handleTestStarted}
            handleTestFinished={this.handleTestFinished}
            addParticipantAnswer={addParticipantAnswer}
            participant={participant}
            postParticipant={postParticipant}
          />
          )}
          {settings.showType === 'full' && (
          <Full
            testStarted={testStarted}
            testFinished={testFinished}
            poll={poll}
            handleTestStarted={this.handleTestStarted}
            handleTestFinished={this.handleTestFinished}
            addParticipantAnswer={addParticipantAnswer}
            participant={participant}
            postParticipant={postParticipant}
          />
          )}
        </Container>
      </>
    );
  }
}

index.propTypes = {
  participantActions: PropTypes.shape({
    addParticipantAnswer: PropTypes.func.isRequired,
    postParticipant: PropTypes.func.isRequired,
  }).isRequired,
  pollsActions: PropTypes.shape({
    getPoll: PropTypes.func.isRequired,
  }).isRequired,
  participant: PropTypes.object.isRequired,
  polls: PropTypes.shape({
    poll: PropTypes.shape({
      settings: PropTypes.object,
    }).isRequired,
  }).isRequired,
};

// We need to get poll because of preview.
const mapStateToProps = state => ({
  poll: state.poll,
  polls: state.polls,
  participant: state.participant,
});

function mapDispatchToProps(dispatch) {
  return {
    participantActions: bindActionCreators(participantActions, dispatch),
    pollsActions: bindActionCreators(pollsActions, dispatch),
  };
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(index));
