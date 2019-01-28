import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  Card, CardBody, CardTitle, Row, Col, Badge,
} from 'reactstrap';
import styled from 'styled-components';

import Setting from '../../components/PollEditor/Setting';
import * as pollActions from '../../redux/actions/pollActions';
import { settingsInfos } from './settingsInfos';

const CardStyled = styled(Card)`
`;

const CardHideAble = styled(CardStyled)` 
    pointer-events: ${props => (props.show ? '' : 'none')};
  opacity: ${props => (props.show ? 1 : 0.4)};
`;

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pollTime: '',
      answerTime: '',
      answerAutoChangeTime: '',
    };
    this.pollTimeOnChange = this.pollTimeOnChange.bind(this);
    this.answerTimeOnChange = this.answerTimeOnChange.bind(this);
    this.answerAutoChangeTime = this.answerAutoChangeTime.bind(this);
  }

  pollTimeOnChange(e) {
    const pollTime = e.target.value;
    this.setState({ pollTime });
    this.props.handlePollTime(pollTime);
  }

  answerTimeOnChange(e) {
    const answerTime = e.target.value;
    this.setState({ answerTime });
    this.props.handleAnswerTime(answerTime);
  }

  answerAutoChangeTime(e) {
    const answerAutoChangeTime = e.target.value;
    this.setState({ answerAutoChangeTime });
    this.props.handleAnswerAutoChangeTime(answerAutoChangeTime);
  }

  render() {
    const { props, state } = this;

    // Inputs
    const { pollTime, answerTime, answerAutoChangeTime } = state;

    // Actions
    const {
      handleHasPollTime,
      handleHasAnswerTime,
      handleHasAnswerAutoChangeTime,

      handleShowType,
      handleIsPollActive,
      handleAnswerPercent,
      handleType,
      handleUserDataCollectType,
      poll,
    } = props;

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
    } = poll.settings;
    return (
      <Card className="my-4">
        <CardBody>
          <CardTitle tag="h5">Ayarlar</CardTitle>
          <Row>
            <Col md={3}>
              <CardStyled body show>
                <Setting
                  value={type}
                  labels={['Test', 'Anket']}
                  name="type"
                  header="Çalışma Tipi"
                  onChange={handleType}
                  tooltip="Çalışma tipini seçin"
                  info={settingsInfos.type}
                />
              </CardStyled>
            </Col>
            <Col md={3}>
              <CardStyled body>
                <Setting
                  value={showType}
                  labels={['Yan yana', 'Tek Sayfada']}
                  name="showType"
                  header="Görünüm"
                  onChange={handleShowType}
                  tooltip="Anket görünümünü seçin"
                  info={settingsInfos.showType}
                />
              </CardStyled>
            </Col>
            <Col md={3}>
              <CardStyled body>
                <Setting
                  value={isPollActive}
                  name="isPollActive"
                  header="Anket Durumu"
                  labels={['Aktif', 'İnaktif']}
                  onChange={handleIsPollActive}
                  tooltip="Anket durumunu seçin"
                  info={settingsInfos.isPollActive}
                />
              </CardStyled>
            </Col>
            <Col md={3}>
              <CardStyled body>
                <Setting
                  value={hasAnswerPercent}
                  name="hasAnswerPercent"
                  header="Cevap Yüzdeleri"
                  onChange={handleAnswerPercent}
                  tooltip="Her cevap için verilen cevap yüzdelerini gösterecektir."
                  info={settingsInfos.hasAnswerPercent}
                />
              </CardStyled>
            </Col>
          </Row>
          <Row>
            <Col md={3}>
              <CardStyled>
                <CardBody>
                  <Setting
                    value={userDataCollectType}
                    name="userDataCollectType"
                    labels={['Form Sunulsun', 'Anonim']}
                    header="Kullanıcı Verisi"
                    onChange={handleUserDataCollectType}
                    info={settingsInfos.userDataCollectType}
                  />
                </CardBody>
              </CardStyled>
            </Col>
            <Col md={3}>
              <CardHideAble show={!hasAnswerTime}>
                <Badge color="warning">IN PROGRESS</Badge>
                <CardBody>
                  <Setting
                    value={hasPollTime}
                    name="hasPollTime"
                    header="Test Süresi"
                    onChange={handleHasPollTime}
                    hasInput
                    inputValue={pollTime}
                    inputChange={this.pollTimeOnChange}
                    inputPlaceHolder="dakika"
                    tooltip="Bu seçenek geliştirilme sürecinde"
                    info={settingsInfos.hasPollTime}
                  />
                </CardBody>
              </CardHideAble>
            </Col>
            <Col md={3}>
              <CardHideAble show={showType === 'sideBySide' && !hasPollTime}>
                <Badge color="warning">IN PROGRESS</Badge>
                <CardBody>
                  <Setting
                    value={hasAnswerTime}
                    name="hasAnswerTime"
                    header="Soru Süresi"
                    onChange={handleHasAnswerTime}
                    hasInput
                    inputValue={answerTime}
                    inputChange={this.answerTimeOnChange}
                    inputPlaceHolder="saniye"
                    tooltip="Bu seçenek geliştirilme sürecinde"
                    info={settingsInfos.hasAnswerTime}
                  />
                </CardBody>
              </CardHideAble>
            </Col>
            <Col md={3}>
              <CardHideAble body show={showType === 'sideBySide'}>
                <Setting
                  value={hasAnswerAutoChangeTime}
                  name="hasAnswerAutoChangeTime"
                  header="Otomatik Geçiş"
                  onChange={handleHasAnswerAutoChangeTime}
                  hasInput
                  inputValue={answerAutoChangeTime}
                  inputChange={this.answerAutoChangeTime}
                  inputPlaceHolder=".."
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

Settings.propTypes = {
  handlePollTime: PropTypes.func.isRequired,
  handleAnswerTime: PropTypes.func.isRequired,
  handleAnswerAutoChangeTime: PropTypes.func.isRequired,
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
};

const mapStateToProps = state => ({
  poll: state.poll,
});

export default connect(
  mapStateToProps,
  pollActions,
)(Settings);
