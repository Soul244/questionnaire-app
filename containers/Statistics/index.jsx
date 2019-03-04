import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import PropTypes from 'prop-types';

import {
  Container, Row, Col, Card, CardBody, CardText, CardTitle,
} from 'reactstrap';
import {
  PieChart, Pie, Tooltip,
} from 'recharts';

import * as participantActions from '../../redux/actions/participantActions';
import * as pollsActions from '../../redux/actions/pollsActions';
import PercentTable from '../../components/Statistics/PercentTable';
import withNavbar from '../../hoc/withNavbar';

@withNavbar
class index extends Component {
  componentWillMount() {
    this.props.participantActions.getParticipants(this.props.slug);
    this.props.pollsActions.getPoll(this.props.slug);
  }

  // eslint-disable-next-line class-methods-use-this
  percents(participants) {
    let totalRight = 0;
    let totalWrong = 0;
    let totalhasNotRightAnswer = 0;
    for (let index = 0; index < participants.length; index += 1) {
      const element = participants[index];
      const right = _.filter(element.answers,
        (item) => { if (item.hasRightAnswer && item.isTrue) return item; }).length;
      const wrong = _.filter(element.answers,
        (item) => { if (item.hasRightAnswer && item.isTrue === false) return item; }).length;
      const hasNotRightAnswer = _.filter(element.answers,
        (item) => { if (!item.hasRightAnswer) return item; }).length;
      totalRight += right;
      totalWrong += wrong;
      totalhasNotRightAnswer += hasNotRightAnswer;
    }
    return { totalRight, totalWrong, totalhasNotRightAnswer };
  }

  render() {
    const { participants } = this.props.participant;
    const { polls } = this.props;
    const { poll } = polls;
    const count = participants.length;
    const percents = this.percents(participants);
    const data = [{ name: 'Doğru Sayısı', value: percents.totalRight, fill: 'green' }, { name: 'Yanlış Sayısı', value: percents.totalWrong, fill: 'red' }];
    return (
      <Row>
        <Col md="6">
          <Card className="text-center">
            <CardBody>
              <PieChart width={300} height={300}>
                <Pie isAnimationActive={false} data={data} outerRadius={80} label />
                <Tooltip />
              </PieChart>
              <hr />
              <CardTitle>Kullanıcıların Toplam Yanlış Sayısı</CardTitle>
              <CardText>
                {`${percents.totalWrong} yanlış cevap`}
              </CardText>
              <hr />
              <CardTitle>Kullanıcıların Toplam Doğru Sayısı</CardTitle>
              <CardText>
                {`${percents.totalRight} doğru cevap`}
              </CardText>
              <hr />
              <CardTitle>Doğru ya da Yanlış Olarak İşaretlenmemiş ve Cevaplanmış Sorular Toplamı</CardTitle>
              <CardText>
                {`${percents.totalhasNotRightAnswer}`}
              </CardText>
            </CardBody>
          </Card>
        </Col>
        <Col md="6" className="text-center">
          <Card>
            <CardBody>
              <CardTitle>Anketi Çözen Kullanıcı Sayısı</CardTitle>
              <CardText>
                {`${count} kişi`}
              </CardText>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <CardTitle>Anketteki Soru Sayısı</CardTitle>
              <CardText>
                {`${poll.questions !== undefined ? poll.questions.length : 0} soru`}
              </CardText>
            </CardBody>
          </Card>
        </Col>
        <Col md={12}>
          <Card>
            <CardBody>
              <CardTitle>Cevap İstatistikleri</CardTitle>
              <PercentTable poll={poll} />
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}

index.propTypes = {
  pollsActions: PropTypes.object.isRequired,
  participantActions: PropTypes.object.isRequired,
  participant: PropTypes.object.isRequired,
  polls: PropTypes.object.isRequired,
  slug: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  return {
    participant: state.participant,
    polls: state.polls,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    participantActions: bindActionCreators(participantActions, dispatch),
    pollsActions: bindActionCreators(pollsActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(index);
