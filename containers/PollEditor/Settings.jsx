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
import { settingsInfos } from '../settingsInfos';

const CardHideAble = styled(Card)`
  pointer-events: ${props => (props.show ? '' : 'none')};
  opacity: ${props => (props.show ? 1 : 0.4)};
`;

class Settings extends React.Component {
  static propTypes = {
    poll: PropTypes.shape({
      hasPollTime: PropTypes.bool,
      hasAnswerTime: PropTypes.bool,
      hasAnswerAutoChangeTime: PropTypes.bool,
      isPollActive: PropTypes.bool,
      showType: PropTypes.string,
      pollTime: PropTypes.string,
      answerTime: PropTypes.string,
      answerAutoChangeTime: PropTypes.string,
    }).isRequired,
    pollActions: PropTypes.shape({
      handlePollTime: PropTypes.func.isRequired,
      handleAnswerTime: PropTypes.func.isRequired,
      handleAnswerAutoChangeTime: PropTypes.func.isRequired,
    }),
  };

  render() {
    // Inputs
    const { poll } = this.props;
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
    } = this.props.pollActions;

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
    } = poll.settings;
    return (
      <Card className="my-2">
        <CardBody>
          <CardTitle tag="h5">Ayarlar</CardTitle>
          <Row>
            <Col md={3}>
              <Card body>
                <Setting
                  values={['test', 'poll']}
                  labels={['Test', 'Anket']}
                  checkedValue={type}
                  name="type"
                  header="Çalışma Tipi"
                  onChange={handleType}
                  tooltip="Çalışma tipini seçin"
                  info={settingsInfos.type}
                />
              </Card>
            </Col>
            <Col md={3}>
              <Card body>
                <Setting
                  values={['sideBySide', 'onePage']}
                  labels={['Yan yana', 'Tek Sayfada']}
                  checkedValue={showType}
                  name="showType"
                  header="Görünüm"
                  onChange={handleShowType}
                  tooltip="Anket görünümünü seçin"
                  info={settingsInfos.showType}
                />
              </Card>
            </Col>
            <Col md={3}>
              <Card body>
                <Setting
                  values={['active', 'inactive']}
                  labels={['Aktif', 'İnaktif']}
                  checkedValue={isPollActive}
                  name="isPollActive"
                  header="Anket Durumu"
                  onChange={handleIsPollActive}
                  tooltip="Anket durumunu seçin"
                  info={settingsInfos.isPollActive}
                />
              </Card>
            </Col>
            <Col md={3}>
              <Card body>
                <Setting
                  checkedValue={hasAnswerPercent}
                  name="hasAnswerPercent"
                  header="Cevap Yüzdeleri"
                  onChange={handleHasAnswerPercent}
                  tooltip="Her cevap için verilen cevap yüzdelerini gösterecektir."
                  info={settingsInfos.hasAnswerPercent}
                />
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={3}>
              <Card>
                <CardBody>
                  <Setting
                    values={['form', 'anonim']}
                    labels={['Form Sunulsun', 'Anonim']}
                    checkedValue={userDataCollectType}
                    name="userDataCollectType"
                    header="Kullanıcı Verisi"
                    onChange={handleUserDataCollectType}
                    info={settingsInfos.userDataCollectType}
                  />
                </CardBody>
              </Card>
            </Col>
            <Col md={3}>
              <CardHideAble show={!hasAnswerTime ? 1 : 0}>
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
                    info={settingsInfos.hasPollTime}
                  />
                </CardBody>
              </CardHideAble>
            </Col>
            <Col md={3}>
              <CardHideAble show={showType === 'sideBySide' && !hasPollTime ? 1 : 0}>
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
                    info={settingsInfos.hasAnswerTime}
                  />
                </CardBody>
              </CardHideAble>
            </Col>
            <Col md={3}>
              <CardHideAble body show={showType === 'sideBySide' ? 1 : 0}>
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
                  info={settingsInfos.hasAnswerAutoChangeTime}
                />
              </CardHideAble>
            </Col>
          </Row>
        </CardBody>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  poll: state.poll,
});

const mapDispatchToProps = dispatch => ({
  pollActions: bindActionCreators(pollActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Settings);
