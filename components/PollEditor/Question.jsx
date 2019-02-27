import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Container, Card, CardBody, CardHeader, Row, Col,
} from 'reactstrap';
import styled from 'styled-components';
import Desc from './Desc';
import Icon, { arrowDown, plus } from '../../css/icons';
import { ContentViewer, AnswerTool } from '../Shared';
import InputBox from './Shared/InputBox';

const QuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 1rem;
`;

const PlusButtonContainer = styled.div`
  margin-right: auto;
  margin-bottom: 1rem;
  margin-top: 1rem;
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

const CardBodyContainer = styled(CardBody)`
  display: ${props => (props.show ? 'block' : 'none')};
`;

const ButtonWithIcon = styled.button`
  svg {
    transform: rotate(${props => (props.show ? '0deg' : '180deg')});
    transition: transform 0.4s ease;
  }
`;

const ContentContainer = styled.div` 
    margin: 1rem 0 0 1rem;
`;

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
      showDesc: false,
      descText: 'açıklamayı göster',
      showDelete: false,
      answerToolShow: false,
    };
    this.descToggle = this.descToggle.bind(this);
    this.answerToolToggle = this.answerToolToggle.bind(this);
    this.toggle = this.toggle.bind(this);
    this.toggleDelete = this.toggleDelete.bind(this);
  }

  descToggle() {
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
  answerToolToggle() {
    this.setState(prevState => ({
      answerToolShow: !prevState.answerToolShow,
    }));
  }

  // Hide-Show question div
  toggle() {
    this.setState(prevState => ({
      show: !prevState.show,
    }));
  }

  // Hide-Show Delete Modal
  toggleDelete() {
    this.setState(prevState => ({
      showDelete: !prevState.showDelete,
    }));
  }

  render() {
    const {
      show,
      showDesc,
      descText,
      answerToolShow,
    } = this.state;
    const {
      onChangeQuestionContent,
      onChangeQuestionType,
      onChangeQuestionDesc,
      deleteQuestion,
      addAnswer,
      content,
      order,
      type,
      desc,
      index,
      rightAnswerOrder,
    } = this.props;
    console.log('------------------------------');
    console.log(`props: ${this.props.content}`);
    console.log('------------------------------');
    return (
      <Card className="my-4">
        <CardHeaderStyled>
          <LeftContainer>
            <QuestionOrderInfo show={!answerToolShow}>
              {`${order + 1}. Soru`}
            </QuestionOrderInfo>
            <AnswerTool
              addAnswer={addAnswer}
              questionOrder={order}
              toggle={this.answerToolToggle}
              show={answerToolShow}
            />
          </LeftContainer>
          <RightContainer show={!answerToolShow}>
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
                <QuestionContainer>
                  <InputBox
                    onChangeType={e => onChangeQuestionType(e.target.value, index)}
                    typeValue={type}
                    onChangeInput={e => onChangeQuestionContent(e.target.value, index)}
                    inputValue={content}
                    handleDelete={() => deleteQuestion(index)}
                    order={order}
                  />
                  {type !== 'heading'
                    && (type !== 'text' && (
                      <>
                        <PlusButtonContainer>
                          <button
                            type="button"
                            className="clear-btn bttn"
                            onClick={this.descToggle}
                          >
                            <Icon size="12px" icon={plus} />
                            {' '}
                            {descText}
                          </button>
                        </PlusButtonContainer>
                        <Desc
                          type={type}
                          show={showDesc}
                          value={desc}
                          onChange={e => onChangeQuestionDesc(e.target.value, index)}
                        />
                      </>
                    ))}
                  <ContentContainer>
                    <ContentViewer type={type} content={content} />
                  </ContentContainer>
                </QuestionContainer>
              </Col>
            </Row>
          </ContainerStyled>
        </CardBodyContainer>
      </Card>
    );
  }
}

Question.propTypes = {
  onChangeQuestionContent: PropTypes.func.isRequired,
  deleteQuestion: PropTypes.func.isRequired,
  addAnswer: PropTypes.func.isRequired,
  onChangeQuestionType: PropTypes.func.isRequired,
  onChangeQuestionDesc: PropTypes.func.isRequired,
  rightAnswerOrder: PropTypes.number.isRequired,

  index: PropTypes.number.isRequired,
  content: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  order: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
};

export default Question;


/*
                <Answers
                  answers={answers.filter(
                    answer => answer.questionOrder === order
                  )}
                  questionOrder={order}
                  rightAnswerOrder={rightAnswerOrder}
                  onClickRightAnswer={onClickRightAnswer}
                />
*/
