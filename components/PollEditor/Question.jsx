import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Card, CardBody, CardHeader, Col,
} from 'reactstrap';
import styled from 'styled-components';
import { SortableElement } from 'react-sortable-hoc';
import Desc from './Desc';
import Icon, { arrowDown, plus } from '../../css/icons';
import { ContentViewer, AnswerTool } from '../Shared';
import InputBox from './Shared/InputBox';
import { SortableButton } from '../Sortable';
import colors from '../../css/colors';

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
  top: 0px;
  z-index: 4;
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

const QuestionIndexInfo = styled.div`
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

@SortableElement
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
  };

  // Hide-Show answer tool
  answerToolToggle = () => {
    this.setState(prevState => ({
      answerToolShow: !prevState.answerToolShow,
    }));
  };

  // Hide-Show question div
  toggle = () => {
    this.setState(prevState => ({
      show: !prevState.show,
    }));
  };

  // Hide-Show Delete Modal
  toggleDelete = () => {
    this.setState(prevState => ({
      showDelete: !prevState.showDelete,
    }));
  };

  render() {
    const {
      show, showDesc, descText, answerToolShow,
    } = this.state;
    const {
      onChangeQuestionContent,
      onChangeQuestionType,
      onChangeQuestionDesc,
      deleteQuestion,
      addAnswer,
      content,
      index,
      type,
      desc,
      children,
    } = this.props;
    return (
      <Card className="my-4">
        <CardHeaderStyled>
          <LeftContainer>
            <QuestionIndexInfo show={!answerToolShow ? 1 : 0}>
              {`${index + 1}. Soru`}
            </QuestionIndexInfo>
            <AnswerTool
              addAnswer={addAnswer}
              questionIndex={index}
              toggle={this.answerToolToggle}
              show={answerToolShow ? 1 : 0}
            />
          </LeftContainer>
          <RightContainer show={!answerToolShow}>
            <SortableButton />
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
          <Col md="12">
            <QuestionContainer>
              <InputBox
                index={index}
                typeValue={type}
                inputValue={content}
                onChangeInput={e => onChangeQuestionContent(e.target.value, index)
                }
                onChangeType={e => onChangeQuestionType(e.target.value, index)}
                handleDelete={() => deleteQuestion(index)}
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
                      onChange={e => onChangeQuestionDesc(e.target.value, index)
                      }
                    />
                  </>
                ))}
              <ContentContainer>
                <ContentViewer type={type} content={content} />
              </ContentContainer>
            </QuestionContainer>
          </Col>
          {children}
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

  index: PropTypes.number.isRequired,
  content: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default Question;
