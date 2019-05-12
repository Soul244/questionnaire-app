import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  Card, CardBody, CardTitle, Row, Col, Badge,
} from 'reactstrap';
import styled from 'styled-components';

import Setting from '../../components/PollEditor/Setting';
import * as pollActions from '../../redux/actions/pollActions';
import settingsInfo from './settingsInfo';

const CardHideAble = styled(Card)`
  pointer-events: ${props => (props.show ? '' : 'none')};
  opacity: ${props => (props.show ? 1 : 0.4)};
`;

function Settings(props) {
  // Inputs
  const { pollReducer, pollActions } = props;

  const { poll } = pollReducer;

  const { settings } = poll;
  // Actions
  const {
    handleHasPollTime,
    handleHasAnswerTime,
    handleHasAnswerAutoChangeTime,
    handleShowType,
    handleIsPollActive,
    handleHasAnswerPercent,
    handleType,
    handleUserDataCollectType,
    handlePollTime,
    handleAnswerTime,
    handleAnswerAutoChangeTime,
  } = pollActions;

  // Values
  const {
    hasPollTime,
    hasAnswerTime,
    hasAnswerAutoChangeTime,
    isPollActive,
    showType,
    type,
    userDataCollectType,
    hasAnswerPercent,
    pollTime,
    answerTime,
    answerAutoChangeTime,
  } = settings;
  return (
    <Card body>
      <CardTitle tag="h5"><FormattedMessage id="editor.settings-header" /></CardTitle>
      <Row>
        <Col md={3}>
          <Card body className="mb-2">
            <Setting
              values={['test', 'poll']}
              labels={['editor.settings-handle-type-label1', 'editor.settings-handle-type-label2']}
              checkedValue={type}
              name="type"
              header="editor.settings-handle-type"
              onChange={handleType}
              info={settingsInfo.type}
            />
          </Card>
        </Col>
        <Col md={3}>
          <Card body className="mb-2">
            <Setting
              values={['sideBySide', 'onePage']}
              labels={['editor.settings-show-type-label1', 'editor.settings-show-type-label2']}
              checkedValue={showType}
              name="showType"
              header="editor.settings-show-type"
              onChange={handleShowType}
              info={settingsInfo.showType}
            />
          </Card>
        </Col>
        <Col md={3}>
          <Card body className="mb-2">
            <Setting
              values={['active', 'inactive']}
              labels={['editor.settings-poll-active-label1', 'editor.settings-poll-active-label2']}
              checkedValue={isPollActive}
              name="isPollActive"
              header="editor.settings-poll-active"
              onChange={handleIsPollActive}
              info={settingsInfo.isPollActive}
            />
          </Card>
        </Col>
        <Col md={3}>
          <Card body className="mb-2">
            <Setting
              checkedValue={hasAnswerPercent}
              labels={['general.yes', 'general.no']}
              name="hasAnswerPercent"
              header="editor.settings-answer-percent"
              onChange={handleHasAnswerPercent}
              info={settingsInfo.hasAnswerPercent}
            />
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={3}>
          <Card className="mb-2">
            <CardBody>
              <Setting
                values={['form', 'anonim']}
                labels={['editor.settings-user-data-collect-type-label1', 'editor.settings-user-data-collect-type-label2']}
                checkedValue={userDataCollectType}
                name="userDataCollectType"
                header="editor.settings-user-data-collect-type"
                onChange={handleUserDataCollectType}
                info={settingsInfo.userDataCollectType}
              />
            </CardBody>
          </Card>
        </Col>
        <Col md={3}>
          <CardHideAble show={!hasAnswerTime ? 1 : 0} className="mb-2">
            <Badge color="warning"><FormattedMessage id="general.in-progress" /></Badge>
            <CardBody>
              <Setting
                checkedValue={hasPollTime}
                labels={['general.yes', 'general.no']}
                name="hasPollTime"
                header="editor.settings-poll-time"
                onChange={handleHasPollTime}
                hasInput
                inputValue={pollTime}
                inputChange={e => handlePollTime(e.target.value)}
                inputPlaceHolder="editor.settings-poll-time-input-placeholder"
                tooltip="general.in-progress"
                info={settingsInfo.hasPollTime}
              />
            </CardBody>
          </CardHideAble>
        </Col>
        <Col md={3}>
          <CardHideAble show={showType === 'sideBySide' && !hasPollTime ? 1 : 0} className="mb-2">
            <Badge color="warning"><FormattedMessage id="general.in-progress" /></Badge>
            <CardBody>
              <Setting
                checkedValue={hasAnswerTime}
                labels={['general.yes', 'general.no']}
                name="hasAnswerTime"
                header="editor.settings-answer-time"
                onChange={handleHasAnswerTime}
                hasInput
                inputValue={answerTime}
                inputChange={e => handleAnswerTime(e.target.value)}
                inputPlaceHolder="editor.settings-answer-time-input-placeholder"
                tooltip="general.in-progress"
                info={settingsInfo.hasAnswerTime}
              />
            </CardBody>
          </CardHideAble>
        </Col>
        <Col md={3}>
          <CardHideAble body show={showType === 'sideBySide' ? 1 : 0} className="mb-2">
            <Setting
              checkedValue={hasAnswerAutoChangeTime}
              labels={['general.yes', 'general.no']}
              name="hasAnswerAutoChangeTime"
              header="editor.settings-auto-change"
              onChange={handleHasAnswerAutoChangeTime}
              hasInput
              inputValue={answerAutoChangeTime}
              inputChange={e => handleAnswerAutoChangeTime(e.target.value)}
              inputPlaceHolder="editor.settings-auto-change-input-placeholder"
              tooltip="Her soru arasındaki otomatik geçiş süresi"
              info={settingsInfo.hasAnswerAutoChangeTime}
            />
          </CardHideAble>
        </Col>
      </Row>
    </Card>
  );
}

Settings.propTypes = {
  pollReducer: PropTypes.shape({
    poll: PropTypes.shape({
      settings: PropTypes.shape({
        hasPollTime: PropTypes.bool,
        hasAnswerTime: PropTypes.bool,
        hasAnswerAutoChangeTime: PropTypes.bool,
        isPollActive: PropTypes.string,
        showType: PropTypes.string,
        pollTime: PropTypes.string,
        answerTime: PropTypes.string,
        answerAutoChangeTime: PropTypes.string,
      }),
    }),
  }).isRequired,
  pollActions: PropTypes.shape({
    handlePollTime: PropTypes.func.isRequired,
    handleAnswerTime: PropTypes.func.isRequired,
    handleAnswerAutoChangeTime: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
  pollReducer: state.pollReducer,
});

const mapDispatchToProps = dispatch => ({
  pollActions: bindActionCreators(pollActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Settings);
