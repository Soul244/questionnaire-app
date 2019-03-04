import React, { Component } from 'react';
import { connect } from 'react-redux';
import dynamic from 'next/dynamic';

import {
  Card, CardBody, Input, CardTitle, CardHeader, CardText, Col, Row,
} from 'reactstrap';
import styled from 'styled-components';

import * as pollActions from '../../redux/actions/pollActions';

const InputStyled = styled(Input)` 
  width:240px;
`;

const InputInfo = styled(CardText)` 
  margin-right:0.75rem;
`;

const CardHeaderStyled = styled(CardHeader)` 
  display: flex;
  align-items:center;
`;

const RowStyled = styled(Row)` 
  align-items: center;
`;

const CardTextStyled = styled(CardText)` 
  text-align:right;
`;

class SelectableLastMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      first: '',
      second: '',
      third: '',
      fourth: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    /*
    if (nextProps.poll.selectableLastMessages !== this.props.poll.selectableLastMessages) {
      this.setState({
        first: nextProps.poll.selectableLastMessages[0].content,
        second: nextProps.poll.selectableLastMessages[1].content,
        third: nextProps.poll.selectableLastMessages[2].content,
        fourth: nextProps.poll.selectableLastMessages[3].content,
      });
    } */
  }

  onChangeFirst = (e) => {
    const content = e.target.value;
    this.setState({
      first: content,
    });
    this.props.handleSelectableLastMessage('0-24', content);
  }

  onChangeSecond = (e) => {
    const content = e.target.value;
    this.setState({
      second: content,
    });
    this.props.handleSelectableLastMessage('25-49', content);
  }

  onChangeThird = (e) => {
    const content = e.target.value;
    this.setState({
      third: content,
    });
    this.props.handleSelectableLastMessage('50-75', content);
  }

  onChangeFourth = (e) => {
    const content = e.target.value;
    this.setState({
      fourth: content,
    });
    this.props.handleSelectableLastMessage('76-100', content);
  }

  handleChange = (e) => {
    this.setState({ value: e.target.value });
  }

  render() {
    const {
      value, first, second, third, fourth,
    } = this.state;

    return (
      <Card>
        <CardHeaderStyled>
          <InputInfo>Formül:</InputInfo>
          <InputStyled
            type="select"
            name="select-type"
            id="select-type"
            bsSize="sm"
            value={value}
            onChange={this.handleChange}
          >
            <option value="yüzdesel">Doğru Yüzdesine Göre</option>
            <option value="yüzdesel">Şıklara Göre (Geliştirilme Sürecinde)</option>
          </InputStyled>
        </CardHeaderStyled>
        <CardBody>
          <CardTitle>Seçimli Test Sonu Mesajı</CardTitle>
          <RowStyled>
            <Col md="2">
              <CardTextStyled>Yüzde 0-24 arası</CardTextStyled>
            </Col>
            <Col>
              <Input
                value={first}
                onChange={e => this.onChangeFirst(e)}
              />
            </Col>
          </RowStyled>
          <RowStyled>
            <Col md="2">
              <CardTextStyled>Yüzde 25-49 arası</CardTextStyled>
            </Col>
            <Col>
              <Input
                value={second}
                onChange={e => this.onChangeSecond(e)}
              />
            </Col>
          </RowStyled>
          <RowStyled>
            <Col md="2">
              <CardTextStyled>Yüzde 50-75 arası</CardTextStyled>
            </Col>
            <Col>
              <Input
                value={third}
                onChange={e => this.onChangeThird(e)}
              />
            </Col>
          </RowStyled>
          <RowStyled>
            <Col md="2">
              <CardTextStyled>Yüzde 76-100 arası</CardTextStyled>
            </Col>
            <Col>
              <Input
                value={fourth}
                onChange={e => this.onChangeFourth(e)}
              />
            </Col>
          </RowStyled>
        </CardBody>
      </Card>
    );
  }
}


function mapStateToProps(state) {
  return {
    poll: state.poll,
  };
}

export default connect(
  mapStateToProps,
  pollActions,
)(SelectableLastMessage);
