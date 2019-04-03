import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

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
      <CardTitle tag="h5">Ayarlar</CardTitle>
      <Row>
        <Col md={3}>
          <Card body className="mb-2">
            <Setting
              values={['test', 'poll']}
              labels={['Test', 'Anket']}
              checkedValue={type}
              name="type"
              header="Çalışma Tipi"
              onChange={handleType}
              tooltip="Çalışma tipini seçin"
              info={settingsInfo.type}
            />
          </Card>
        </Col>
        <Col md={3}>
          <Card body className="mb-2">
            <Setting
              values={['sideBySide', 'onePage']}
              labels={['Yan yana', 'Tek Sayfada']}
              checkedValue={showType}
              name="showType"
              header="Görünüm"
              onChange={handleShowType}
              tooltip="Anket görünümünü seçin"
              info={settingsInfo.showType}
            />
          </Card>
        </Col>
        <Col md={3}>
          <Card body className="mb-2">
            <Setting
              values={['active', 'inactive']}
              labels={['Aktif', 'İnaktif']}
              checkedValue={isPollActive}
              name="isPollActive"
              header="Anket Durumu"
              onChange={handleIsPollActive}
              tooltip="Anket durumunu seçin"
              info={settingsInfo.isPollActive}
            />
          </Card>
        </Col>
        <Col md={3}>
          <Card body className="mb-2">
            <Setting
              checkedValue={hasAnswerPercent}
              name="hasAnswerPercent"
              header="Cevap Yüzdeleri"
              onChange={handleHasAnswerPercent}
              tooltip="Her cevap için verilen cevap yüzdelerini gösterecektir."
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
                labels={['Form Sunulsun', 'Anonim']}
                checkedValue={userDataCollectType}
                name="userDataCollectType"
                header="Kullanıcı Verisi"
                onChange={handleUserDataCollectType}
                info={settingsInfo.userDataCollectType}
              />
            </CardBody>
          </Card>
        </Col>
        <Col md={3}>
          <CardHideAble show={!hasAnswerTime ? 1 : 0} className="mb-2">
            <Badge color="warning">IN PROGRESS</Badge>
            <CardBody>
              <Setting
                checkedValue={hasPollTime}
                name="hasPollTime"
                header="Test Süresi"
                onChange={handleHasPollTime}
                hasInput
                inputValue={pollTime}
                inputChange={e => handlePollTime(e.target.value)}
                inputPlaceHolder="dakika"
                tooltip="Bu seçenek geliştirilme sürecinde"
                info={settingsInfo.hasPollTime}
              />
            </CardBody>
          </CardHideAble>
        </Col>
        <Col md={3}>
          <CardHideAble show={showType === 'sideBySide' && !hasPollTime ? 1 : 0} className="mb-2">
            <Badge color="warning">IN PROGRESS</Badge>
            <CardBody>
              <Setting
                checkedValue={hasAnswerTime}
                name="hasAnswerTime"
                header="Soru Süresi"
                onChange={handleHasAnswerTime}
                hasInput
                inputValue={answerTime}
                inputChange={e => handleAnswerTime(e.target.value)}
                inputPlaceHolder="saniye"
                tooltip="Bu seçenek geliştirilme sürecinde"
                info={settingsInfo.hasAnswerTime}
              />
            </CardBody>
          </CardHideAble>
        </Col>
        <Col md={3}>
          <CardHideAble body show={showType === 'sideBySide' ? 1 : 0} className="mb-2">
            <Setting
              checkedValue={hasAnswerAutoChangeTime}
              name="hasAnswerAutoChangeTime"
              header="Otomatik Geçiş"
              onChange={handleHasAnswerAutoChangeTime}
              hasInput
              inputValue={answerAutoChangeTime}
              inputChange={e => handleAnswerAutoChangeTime(e.target.value)}
              inputPlaceHolder="Milisaniye"
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
