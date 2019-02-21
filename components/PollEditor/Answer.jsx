import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import PropTypes from 'prop-types';

import {
  Card,
  CardBody,
  CardHeader,
  Input,
  InputGroup,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import styled from 'styled-components';

import Icon, { remove } from '../../css/icons';
import { types } from '../../containers/toolTypes';
import { ContentViewer } from '../Shared';
import * as pollActions from '../../redux/actions/pollActions';

const HeaderContainer = styled.div`
  padding-top: 1rem;
`;

const SelectContainer = styled(Input)`
  width: 8rem !important;
  margin-left:0.50rem;
`;

const FlexDiv = styled.div`
display:flex;
flex-direction: row;
align-items: center;
`;

const LeftColumn = styled(FlexDiv)`
`;

const RightColumn = styled(FlexDiv)`
  margin-left: auto;
`;

const RadioContainer = styled(FlexDiv)`
  margin-left: 0.5rem;
  p {
    margin-left: 0.5rem;
  }
`;


const ButtonStyled = styled(Button)`
  display:flex;
  flex-direction:row;
  svg{
    margin-bottom: 5px;
    margin-right: 5px;
  }
  p{
    margin:0;
  }
`;

const CardHeaderStyled = styled(CardHeader)`
  display: flex;
  align-items: center;
`;

class Answer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      type: '',
      rightAnswerOrder: 0,
      showDelete: false,
    };
  }

  componentDidMount() {
    const question = _.find(this.props.poll.questions, {
      order: this.props.questionOrder,
    });
    if (question.rightAnswerOrder === this.props.order) {
      this.setState({
        rightAnswerOrder: true,
      });
    }
    this.setState({
      type: this.props.type,
      content: this.props.content,
    });
  }

  onChange = (e) =>  {
    const { order, questionOrder } = this.props;
    const content = e.target.value;
    this.setState({ content });
    this.props.handleOnChangeAnswer(content, questionOrder, order);
  }

  onChangeRightAnswer = (e) =>  {
    const { questionOrder } = this.props;
    const rightAnswerOrder = e.target.value;
    this.props.handleOnClickRightAnswer(questionOrder, rightAnswerOrder);
  }

  onChangeType = (e) =>  {
    const { order, questionOrder } = this.props;
    const type = e.target.value;
    this.setState({ type });
    this.props.handleOnChangeTypeAnswer(type, questionOrder, order);
  }

  toggleDelete = () =>  {
    this.setState(prevState => ({
      showDelete: !prevState.showDelete,
    }));
  }

  render() {
    const {
      content,
      type,
      rightAnswerOrder,
    } = this.state;
    const {
      order, questionOrder, handleDeleteAnswer, poll,
    } = this.props;
    const { settings } = poll;
    return (
      <Card className="my-4">
        <CardHeaderStyled tag="h6">
          {`${order + 1}. Cevap`}
          {' '}
          <LeftColumn>
            <SelectContainer
              type="select"
              name="select-type"
              id="select-type"
              bsSize="sm"
              value={type}
              onChange={this.onChangeType}
            >
              {types.map(({ type, desc }, index) => (
                <option key={index} value={type}>{desc}</option>
              ))}
            </SelectContainer>
            {settings.type === 'test' && (
              <>
                <RadioContainer>
                  <Input
                    addon
                    type="radio"
                    name={questionOrder}
                    value={order}
                    defaultChecked={rightAnswerOrder === order}
                    onChange={this.onChangeRightAnswer}
                  />
                  <p>Doğru Cevap</p>
                </RadioContainer>
              </>
            )}
          </LeftColumn>
          <RightColumn>
            <ButtonStyled color="danger" onClick={this.toggleDelete}>
              <Icon size={12} icon={remove} />
              <p>Cevabı Sil</p>
            </ButtonStyled>
            <Modal isOpen={this.state.showDelete} toggle={this.toggleDelete}>
              <ModalHeader toggle={this.toggleDelete}>Uyarı</ModalHeader>
              <ModalBody>Cevabı silmek istediğinize emin misiniz?</ModalBody>
              <ModalFooter>
                <Button color="danger" onClick={() => handleDeleteAnswer(questionOrder, order)}>Sil</Button>
                {' '}
                <Button color="secondary" onClick={this.toggleDelete}>Hayır</Button>
              </ModalFooter>
            </Modal>
          </RightColumn>
        </CardHeaderStyled>
        <CardBody>
          <HeaderContainer>
            <InputGroup>
              <Input
                placeholder="cevabı giriniz..."
                type="text"
                value={content}
                onChange={this.onChange}
              />
            </InputGroup>
            <hr />
            <ContentViewer type={type} content={content} />
          </HeaderContainer>
        </CardBody>
      </Card>
    );
  }
}

Answer.propTypes = {
  handleDeleteAnswer: PropTypes.func.isRequired,
  handleOnChangeAnswer: PropTypes.func.isRequired,
  handleOnChangeTypeAnswer: PropTypes.func.isRequired,
  handleOnClickRightAnswer: PropTypes.func.isRequired,
  order: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  questionOrder: PropTypes.number.isRequired,
  poll: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  poll: state.poll,
});

export default connect(
  mapStateToProps,
  pollActions,
)(Answer);
