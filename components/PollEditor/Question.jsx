import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  Container,
  Card,
  CardBody,
  CardHeader,
  Row,
  Col,
  Button,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import styled from 'styled-components';

import Desc from './Desc';
import Answers from './Answers';
import { types } from '../../containers/toolTypes';

import Icon, { arrowDown, plus, remove } from '../../css/icons';
import { ContentViewer, AnswerTool } from '../Shared';
import * as pollActions from '../../redux/actions/pollActions';

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 1rem;
`;

const PlusButtonContainer = styled.div`
  margin-right: auto;
  margin-bottom: 1rem;
  margin-top: 1rem;
`;

const DescContainer = styled.div`
  margin-bottom: 1rem;
`;

const CardHeaderStyled = styled(CardHeader)`
  display: flex;
  align-items: center;
  position: sticky;
  top: 50px;
  z-index: 4;
  background-color: #f3f3f3;
`;

const ContainerStyled = styled(Container)`
  padding: 0px;
`;

const SelectContainer = styled.div`
  width: 8rem !important;
  margin-left: 0.5rem;
  @media (max-width: 992px) {
    display: ${props => (props.show ? 'inline-flex' : 'none')};
  }
`;

const RightContainer = styled.div`
  display: inline-flex;
  margin-left: auto;
  @media (max-width: 992px) {
    display: ${props => (props.show ? 'inline-flex' : 'none')};
  }
`;

const LeftContainer = styled.div`
  display: inline-flex;
  align-items: center;
`;

const QuestionOrderInfo = styled.div`
  @media (max-width: 992px) {
    display: ${props => (props.show ? 'block' : 'none')};
  }
`;

const Option = styled.option`
  font-family: 'Material Icons';
`;

const CardBodyContainer = styled(CardBody)`
  display: ${props => (props.show ? 'block' : 'none')};
`;

const ButtonWithIcon = styled.button`
  svg {
    transform: rotate(${props => (props.show ? '0deg' : '180deg')});
    transition: transform 0.4s ease;
  }
`;

const ButtonStyled = styled(Button)`
  display: flex;
  flex-direction: row;
  svg {
    margin-bottom: 5px;
    margin-right: 5px;
  }
  p {
    margin: 0;
  }
`;

class Question extends Component {
  static propTypes = {
    order: PropTypes.number.isRequired,
    type: PropTypes.oneOf([
      'text',
      'heading',
      'image',
      'external-media',
      'gif',
      'audio',
    ]).isRequired,
    content: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    const {
      order, type, content, desc,
    } = props;
    this.state = {
      order,
      type,
      content,
      show: true,
      showDesc: false,
      descText: 'açıklamayı göster',
      desc: desc || '',
      showDelete: false,
      answerToolShow: false,
    };
  }

  onChange = e => {
    const { order } = this.state;
    const content = e.target.value;
    this.setState({ content });
    this.props.handleOnChangeQuestion(content, order);
  }

  onChangeType = e => {
    const { order } = this.state;
    const type = e.target.value;
    this.setState({ type });
    this.props.handleOnChangeTypeQuestion(type, order);
  }

  onChangeDesc = e => {
    const { order } = this.props;
    const content = e.target.value;
    this.setState({ desc: content });
    this.props.handleOnChangeQuestionDesc(content, order);
  }

  descToggle = () => {
    const { showDesc } = this.state;
    if (showDesc) {
      this.setState({
        showDesc: false,
      });
    } else {
      this.setState({
        showDesc: true,
      });
    }
  }

  // Hide-Show answer tool
  answerToolToggle = () =>  {
    this.setState(prevState => ({
      answerToolShow: !prevState.answerToolShow,
    }));
  }

  // Hide-Show question div
  toggle = () =>  {
    this.setState(prevState => ({
      show: !prevState.show,
    }));
  }

  // Hide-Show Delete Modal
  toggleDelete = () =>  {
    this.setState(prevState => ({
      showDelete: !prevState.showDelete,
    }));
  }

  render() {
    const {
      order,
      type,
      content,
      show,
      desc,
      showDesc,
      descText,
      answerToolShow,
    } = this.state;
    const {
      handleDeleteQuestion,
      handleAddAnswer,
      poll,
      rightAnswerOrder,
    } = this.props;
    const { answers } = poll;
    return (
      <Card className="my-4">
        <CardHeaderStyled>
          <LeftContainer>
            <QuestionOrderInfo show={!answerToolShow}>
              {`${order + 1}. Soru`}
            </QuestionOrderInfo>
            <SelectContainer show={!answerToolShow}>
              <Input
                type="select"
                name="select-type"
                id="select-type"
                bsSize="sm"
                value={type}
                onChange={this.onChangeType}
              >
                {types.map(({ type, desc }, index) => (
                  <Option key={index} value={type}>
                    {desc}
                  </Option>
                ))}
              </Input>
            </SelectContainer>
            <AnswerTool
              handleAddAnswer={handleAddAnswer}
              questionOrder={order}
              toggle={this.answerToolToggle}
              show={answerToolShow}
            />
          </LeftContainer>
          <RightContainer show={!answerToolShow}>
            <ButtonStyled size="md" color="danger" onClick={this.toggleDelete}>
              <Icon size={12} icon={remove} />
              <p>Soruyu Sil</p>
            </ButtonStyled>
            <Modal isOpen={this.state.showDelete} toggle={this.toggleDelete}>
              <ModalHeader toggle={this.toggleDelete}>Uyarı</ModalHeader>
              <ModalBody>Soruyu silmek istediğinize emin misiniz?</ModalBody>
              <ModalFooter>
                <Button color="danger" onClick={() => handleDeleteQuestion(order)}>Sil</Button>
                {' '}
                <Button color="secondary" onClick={this.toggleDelete}>Hayır</Button>
              </ModalFooter>
            </Modal>
            <ButtonWithIcon
              type="button"
              className="clear-btn"
              onClick={this.toggle}
              show={show ? 1 : 0}
            >
              <Icon size={24} icon={arrowDown} />
            </ButtonWithIcon>
          </RightContainer>
        </CardHeaderStyled>
        <CardBodyContainer show={show ? 1 : 0}>
          <ContainerStyled>
            <Row>
              <Col md="12">
                <HeaderContainer>
                  <Input
                    type="text"
                    value={content}
                    placeholder="soruyu giriniz..."
                    onChange={this.onChange}
                  />
                  <DescContainer>
                    {type !== 'heading'
                          && (type !== 'text' && (
                            <PlusButtonContainer>
                              <button
                                type="button"
                                className="clear-btn bttn"
                                onClick={this.descToggle}
                              >
                                <>
                                  <Icon size="12px" icon={plus} /> {descText}
                                </>
                              </button>
                            </PlusButtonContainer>
                          ))}
                    <Desc
                      type={type}
                      show={showDesc}
                      value={desc}
                      onChange={this.onChangeDesc}
                    />
                  </DescContainer>
                  <ContentViewer type={type} content={content} />
                </HeaderContainer>
                <Answers
                  answers={answers.filter(answer => answer.questionOrder === order)}
                  questionOrder={order}
                  rightAnswerOrder={rightAnswerOrder}
                />
              </Col>
            </Row>
          </ContainerStyled>
        </CardBodyContainer>
      </Card>
    );
  }
}

Question.propTypes = {
  handleOnChangeQuestion: PropTypes.func.isRequired,
  handleDeleteQuestion: PropTypes.func.isRequired,
  handleAddAnswer: PropTypes.func.isRequired,
  handleOnChangeTypeQuestion: PropTypes.func.isRequired,
  handleOnChangeQuestionDesc: PropTypes.func.isRequired,
  poll: PropTypes.object.isRequired,
  rightAnswerOrder: PropTypes.number.isRequired,
  desc: PropTypes.string,
  type: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  poll: state.poll,
});

export default connect(
  mapStateToProps,
  pollActions,
)(Question);
