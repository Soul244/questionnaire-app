import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Card, CardBody, CardHeader, Row, Col, Input } from 'reactstrap';
import styled from 'styled-components';
import Desc from './Desc';
import Answers from './Answers';
import Icon, { arrowDown, plus } from '../../css/icons';
import { ContentViewer, AnswerTool } from '../Shared';
import * as pollActions from '../../redux/actions/pollActions';
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
  static propTypes = {
    order: PropTypes.number.isRequired,
    type: PropTypes.oneOf([
      'text',
      'heading',
      'image',
      'external-media',
      'gif',
      'audio'
    ]).isRequired,
    content: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      order: null,
      type: null,
      content: null,
      show: true,
      showDesc: false,
      descText: 'açıklamayı göster',
      desc:  null,
      showDelete: false,
      answerToolShow: false
    };
  }

  componentDidMount(){
    const {content, type, desc, order} = this.props;
    this.setState({
      content,
      type,
      desc,
      order 
    })
  }

  onChange = e => {
    const { order } = this.state;
    const content = e.target.value;
    this.setState({ content });
    this.props.onChangeQuestion(content, order);
  };

  onChangeType = e => {
    const { order } = this.state;
    const type = e.target.value;
    this.setState({ type });
    this.props.onChangeQuestionType(type, order);
  };

  onChangeDesc = e => {
    const { order } = this.props;
    const content = e.target.value;
    this.setState({ desc: content });
    this.props.onChangeQuestionDesc(content, order);
  };

  descToggle = () => {
    const { showDesc } = this.state;
    if (showDesc) {
      this.setState({
        showDesc: false
      });
    } else {
      this.setState({
        showDesc: true
      });
    }
  };

  // Hide-Show answer tool
  answerToolToggle = () => {
    this.setState(prevState => ({
      answerToolShow: !prevState.answerToolShow
    }));
  };

  // Hide-Show question div
  toggle = () => {
    this.setState(prevState => ({
      show: !prevState.show
    }));
  };

  // Hide-Show Delete Modal
  toggleDelete = () => {
    this.setState(prevState => ({
      showDelete: !prevState.showDelete
    }));
  };

  render() {
    const {
      order,
      type,
      content,
      show,
      desc,
      showDesc,
      descText,
      answerToolShow
    } = this.state;
    const {
      deleteQuestion,
      addAnswer,
      onClickRightAnswer,
      poll,
      rightAnswerOrder
    } = this.props;
    const { answers } = poll;
    console.log("------------------------------")
    console.log("props: "+this.props.content);
    console.log("state: "+this.state.content)
    console.log("------------------------------")
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
                    onChangeType={this.onChangeType}
                    typeValue={type}
                    onChangeInput={this.onChange}
                    inputValue={content}
                    handleDelete={deleteQuestion}
                    order={order}
                  />
                  {type !== 'heading' &&
                    (type !== 'text' && (
                      <>
                        <PlusButtonContainer>
                          <button
                            type="button"
                            className="clear-btn bttn"
                            onClick={this.descToggle}
                          >
                            <Icon size="12px" icon={plus} /> {descText}
                          </button>
                        </PlusButtonContainer>
                        <Desc
                          type={type}
                          show={showDesc}
                          value={desc}
                          onChange={this.onChangeDesc}
                        />
                      </>
                    ))}
                    <ContentContainer>
                      <ContentViewer type={type} content={content} />
                    </ContentContainer>
                </QuestionContainer>
                <Answers
                  answers={answers.filter(
                    answer => answer.questionOrder === order
                  )}
                  questionOrder={order}
                  rightAnswerOrder={rightAnswerOrder}
                  onClickRightAnswer={onClickRightAnswer}
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
  onChangeQuestion: PropTypes.func.isRequired,
  deleteQuestion: PropTypes.func.isRequired,
  addAnswer: PropTypes.func.isRequired,
  onChangeQuestionType: PropTypes.func.isRequired,
  onChangeQuestionDesc: PropTypes.func.isRequired,
  poll: PropTypes.object.isRequired,
  rightAnswerOrder: PropTypes.number,
  desc: PropTypes.string,
  type: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  poll: state.poll
});

export default connect(
  mapStateToProps,
  pollActions
)(Question);
