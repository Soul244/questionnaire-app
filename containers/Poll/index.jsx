/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import {
  Container,
} from 'reactstrap';

import { pollActions, participantActions } from '~actions';
import Poll from '~components/Poll';
import { PollActive } from '~components/Poll/Shared';

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      testStarted: false,
      testFinished: false,
    };
  }

  componentDidMount() {
    const {
      _id, isPreview, pollReducer, pollActions,
    } = this.props;
    const { getPoll, getPreview } = pollActions;
    const { poll } = pollReducer;
    if (!isPreview) {
      getPoll(_id);
    } else {
      getPreview(poll);
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

  render() {
    const { testStarted, testFinished } = this.state;
    const { participantActions, participantReducer, pollReducer } = this.props;
    const { addParticipantAnswer, postParticipant } = participantActions;
    const { participant, message } = participantReducer;
    const { poll } = pollReducer;
    const { settings } = poll;
    if (settings === undefined) return null;
    if (!settings.isPollActive) {
      return <PollActive />;
    }
    return (
      <>
        <Container className="my-4">
          <Poll
            showType={settings.showType}
            testStarted={testStarted}
            testFinished={testFinished}
            poll={poll}
            handleTestStarted={this.handleTestStarted}
            handleTestFinished={this.handleTestFinished}
            addParticipantAnswer={addParticipantAnswer}
            participant={participant}
            postParticipant={postParticipant}
            message={message}
          />
        </Container>
      </>
    );
  }
}

index.defaultProps = {
  isPreview: false,
};

index.propTypes = {
  _id: PropTypes.string.isRequired,
  isPreview: PropTypes.bool,

  pollReducer: PropTypes.shape({
    poll: PropTypes.shape({
      settings: PropTypes.object,
    }),
  }).isRequired,
  pollActions: PropTypes.shape({
    getPoll: PropTypes.func.isRequired,
  }).isRequired,

  participantReducer: PropTypes.shape({
    participant: PropTypes.object,
    message: PropTypes.string,
  }).isRequired,
  participantActions: PropTypes.shape({
    addParticipantAnswer: PropTypes.func.isRequired,
    postParticipant: PropTypes.func.isRequired,
  }).isRequired,
};

// We need to get poll because of preview.
const mapStateToProps = state => ({
  pollReducer: state.pollReducer,
  participantReducer: state.participantReducer,
});

function mapDispatchToProps(dispatch) {
  return {
    participantActions: bindActionCreators(participantActions, dispatch),
    pollActions: bindActionCreators(pollActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(index);
