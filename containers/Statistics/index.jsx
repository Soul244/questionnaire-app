import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import PropTypes from 'prop-types';

import {
  Row, Col, Card, CardBody, CardSubtitle, CardText, CardTitle,
} from 'reactstrap';
import { PieChart, Pie, Tooltip } from 'recharts';
import { ToastContainer, toast } from 'react-toastify';
import styled from 'styled-components';

import Icon, {
  users, done, cross, unchecked,
} from '~css/icons';
import { pollActions, participantActions } from '~redux/actions';
import PercentTable from '~components/Statistics/PercentTable';
import { withNavbar } from '~hoc';

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 96px;
  height: 96px;
  border-radius: 50%;
  svg {
    fill: ${props => (props.light ? 'white' : 'darkgrey')};
  }
`;

const CardStyled = styled(Card)`
  justify-content: center;
  align-items: center;
  height: 300px;
  border: none;
  ${({ bg1 }) => bg1
    && `
    background-image: linear-gradient(-90deg, #00B4DB, #0083B0);
  `}
  ${({ bg2 }) => bg2
    && `
    background-image: linear-gradient(-90deg, #f12711, #f5af19);
  `}
   ${({ bg3 }) => bg3
    && `
    background-image: linear-gradient(-90deg, #56ab2f, #a8e063  );
  `}
      ${({ bg4 }) => bg4
    && `
    background-image: linear-gradient(-90deg, #ff416c, #ff4b2b  );
  `}
`;

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

@withNavbar
class index extends Component {
  componentWillMount() {
    const { participantActions, pollActions, _id } = this.props;
    const { getParticipants } = participantActions;
    const { getPoll } = pollActions;
    getParticipants(_id);
    getPoll(_id);
  }

  componentWillReceiveProps(nextProps) {
    const { participantReducer } = this.props;
    const { message } = participantReducer;
    if (nextProps.participantReducer.message !== message) {
      this.notify(nextProps.participantReducer.message);
    }
  }

  notify = (message) => {
    toast.error(message, {
      position: toast.POSITION.BOTTOM_LEFT,
    });
  };

  // eslint-disable-next-line class-methods-use-this
  percents(participants) {
    let totalRight = 0;
    let totalWrong = 0;
    let totalhasNotRightAnswer = 0;
    for (let index = 0; index < participants.length; index += 1) {
      const element = participants[index];
      const right = _.filter(element.answers, (item) => {
        if (item.hasRightAnswer && item.isTrue) return item;
      }).length;
      const wrong = _.filter(element.answers, (item) => {
        if (item.hasRightAnswer && item.isTrue === false) return item;
      }).length;
      const hasNotRightAnswer = _.filter(element.answers, (item) => {
        if (!item.hasRightAnswer) return item;
      }).length;
      totalRight += right;
      totalWrong += wrong;
      totalhasNotRightAnswer += hasNotRightAnswer;
    }
    return { totalRight, totalWrong, totalhasNotRightAnswer };
  }

  render() {
    const { pollReducer, participantReducer } = this.props;
    const { participants } = participantReducer;
    const { poll } = pollReducer;
    const count = participants.length;
    const percents = this.percents(participants);
    let records = false;
    const data = [
      { name: 'Doğru Sayısı', value: percents.totalRight, fill: 'green' },
      { name: 'Yanlış Sayısı', value: percents.totalWrong, fill: 'red' },
    ];
    if (percents.totalRight === 0 && percents.totalWrong) {
      records = true;
    }
    return (
      <>
        <ToastContainer autoClose={3000} />
        <Row>
          <Col md="3">
            <CardStyled inverse bg1 body className="text-center">
              <IconContainer light>
                <Icon size={64} icon={users} />
              </IconContainer>
              <CardTitle>{`${count} kişi`}</CardTitle>
              <CardText>Anketi Çözen Kullanıcı Sayısı</CardText>
            </CardStyled>
          </Col>
          <Col md="3">
            <CardStyled inverse bg3 className="text-center" body>
              <IconContainer light>
                <Icon size={64} icon={done} />
              </IconContainer>
              <CardTitle>{`${percents.totalRight} doğru cevap`}</CardTitle>
              <CardText>Kullanıcıların Toplam Doğru Sayısı</CardText>
            </CardStyled>
          </Col>
          <Col md="3">
            <CardStyled inverse bg4 className="text-center" body>
              <IconContainer light>
                <Icon size={64} icon={cross} />
              </IconContainer>
              <CardTitle>{`${percents.totalWrong} yanlış cevap`}</CardTitle>
              <CardText>Kullanıcıların Toplam Yanlış Sayısı</CardText>
            </CardStyled>
          </Col>
          <Col md="3">
            <CardStyled className="text-center" body>
              <IconContainer>
                <Icon size={64} icon={unchecked} />
              </IconContainer>
              <CardTitle>{`${percents.totalhasNotRightAnswer} cevap`}</CardTitle>
              <CardText>
                Doğru ya da Yanlış Olarak İşaretlenmemiş ve Cevaplanmış Sorular Toplamı
              </CardText>
            </CardStyled>
          </Col>
        </Row>
        <Row>
          <Col md="3">
            <CardStyled body className="text-center mt-2">
              <CardTitle>Anketteki Soru Sayısı</CardTitle>
              <CardText>
                {`${
                  poll.questions !== undefined ? poll.questions.length : 0
                } soru`}
              </CardText>
            </CardStyled>
          </Col>
          <Col md="9">
            <CardStyled className="text-center mt-2" body>
              {records && (
              <PieChart width={300} height={300}>
                <Pie
                  isAnimationActive={false}
                  dataKey="value"
                  data={data}
                  outerRadius={80}
                  label={renderCustomizedLabel}
                />
                <Tooltip />
              </PieChart>
              )}
              {!records && (
                <CardTitle>Hiçbir kayıt bulunamadı.</CardTitle>
              )}
            </CardStyled>
          </Col>
        </Row>
        <Row>
          <Col md="12" body className="text-center mt-2">
            <Card>
              <CardBody>
                <CardTitle>Cevap İstatistikleri</CardTitle>
                <CardSubtitle>Cevap istatistiklerini yüzdesel, sayısal olarak görün.</CardSubtitle>
              </CardBody>
              <CardBody>
                {poll.questions && (
                  <PercentTable poll={poll} />
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </>
    );
  }
}

index.propTypes = {
  _id: PropTypes.string.isRequired,
  pollReducer: PropTypes.object.isRequired,
  pollActions: PropTypes.object.isRequired,
  participantReducer: PropTypes.object.isRequired,
  participantActions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    participantReducer: state.participantReducer,
    pollReducer: state.pollReducer,
  };
}

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
