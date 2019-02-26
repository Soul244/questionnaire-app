import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Card, CardBody, CardHeader, Input, Button } from 'reactstrap';
import styled from 'styled-components';
import { ContentViewer } from '../Shared';
import InputBox from './Shared/InputBox';

const AnswerContainer = styled.div`
  padding-top: 1rem;
`;

const CardHeaderStyled = styled(CardHeader)`
  display: flex;
  align-items: center;
  background-color: ${props=>props.checked?"#5cb85c":''};
`;

const CardStyled = styled(Card)`
  border-width: ${props=>props.checked?"4px":'1px'};
`;
const ContentContainer = styled.div` 
    margin: 1rem 0 0 1rem;
`;

class Answer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      type: '',
      showDelete: false
    };
  }

  componentDidMount() {
    this.setState({
      type: this.props.type,
      content: this.props.content
    });
  }

  onChangeContent = e => {
    const { order, questionOrder, onChangeAnswer } = this.props;
    const content = e.target.value;
    this.setState({ content });
   onChangeAnswer(content, questionOrder, order);
  };

  onChangeType = e => {
    const { order, questionOrder, onChangeAnswerType } = this.props;
    const type = e.target.value;
    this.setState({ type });
    onChangeAnswerType(type, questionOrder, order);
  };

  toggleDelete = () => {
    this.setState(prevState => ({
      showDelete: !prevState.showDelete
    }));
  };

  render() {
    const { content, type } = this.state;
    const { 
      order, 
      questionOrder, 
      pollType, 
      rightAnswerOrder,
      deleteAnswer,
      onChangeRightAnswer 
    } = this.props;
    const checked=rightAnswerOrder===order;
    return (
      <CardStyled className="my-4" outline={checked} checked={checked} color={checked?"success":''}>
        <CardHeaderStyled tag="h6" checked={checked}>{`${order + 1}. Cevap`} </CardHeaderStyled>
        <CardBody>
          <AnswerContainer>
            <InputBox
              order={order}
              questionOrder={questionOrder}
              typeValue={type}
              inputValue={content}
              hasRadio={pollType==="test"}
              checked={checked?1:0}

              handleDelete={deleteAnswer}
              radioChange={onChangeRightAnswer}
              onChangeInput={this.onChangeContent}
              onChangeType={this.onChangeType}
            />
            <ContentContainer>
              <ContentViewer type={type} content={content} />
            </ContentContainer>
          </AnswerContainer>
        </CardBody>
      </CardStyled>
    );
  }
}

Answer.propTypes = {
  // Data
  order: PropTypes.number.isRequired,
  questionOrder: PropTypes.number.isRequired,
  pollType: PropTypes.string.isRequired,
  rightAnswerOrder: PropTypes.number,
  // Functions
  deleteAnswer: PropTypes.func.isRequired,
  onChangeRightAnswer: PropTypes.func.isRequired,
  // Passed and Used in State
  type: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  onChangeAnswer: PropTypes.func.isRequired,
  onChangeAnswerType: PropTypes.func.isRequired,
};

export default Answer;