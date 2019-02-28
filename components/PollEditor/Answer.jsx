import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Card, CardBody, CardHeader,
} from 'reactstrap';
import styled from 'styled-components';
import { ContentViewer } from '../Shared';
import InputBox from './Shared/InputBox';

const AnswerContainer = styled.div`
  padding-top: 1rem;
`;

const CardHeaderStyled = styled(CardHeader)`
  display: flex;
  align-items: center;
  background-color: ${props => (props.checked ? '#5cb85c' : '')};
`;

const ContentContainer = styled.div` 
    margin: 1rem 0 0 1rem;
`;

class Answer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDelete: false,
    };
    this.toggleDelete = this.toggleDelete.bind(this);
  }

  toggleDelete() {
    this.setState(prevState => ({
      showDelete: !prevState.showDelete,
    }));
  }

  render() {
    const {
      index,
      questionIndex,
      // Answer Functions
      onChangeAnswerContent,
      onChangeAnswerType,
      deleteAnswer,
      onChangeRightAnswer,
      // Answer Data
      type,
      content,
      pollType,
      rightAnswerIndex,
    } = this.props;
    const checked = rightAnswerIndex === index;
    return (
      <Card className="my-4" outline={checked} checked={checked} color={checked ? 'success' : ''}>
        <CardHeaderStyled tag="h6" checked={checked}>
          {`${index + 1}. Cevap`}
          {' '}
        </CardHeaderStyled>
        <CardBody>
          <AnswerContainer>
            <InputBox
              index={index}
              typeValue={type}
              inputValue={content}
              hasRadio={pollType === 'test'}
              checked={checked ? 1 : 0}
              radioChange={() => onChangeRightAnswer(questionIndex, index)}
              onChangeInput={e => onChangeAnswerContent(e.target.value, index)}
              onChangeType={e => onChangeAnswerType(e.target.value, index)}
              handleDelete={() => deleteAnswer(index)}
            />
            <ContentContainer>
              <ContentViewer type={type} content={content} />
            </ContentContainer>
          </AnswerContainer>
        </CardBody>
      </Card>
    );
  }
}

Answer.defaultProps = {
  rightAnswerIndex: null,
};

Answer.propTypes = {
  // Data
  index: PropTypes.number.isRequired,
  questionIndex: PropTypes.number.isRequired,
  pollType: PropTypes.string.isRequired,
  rightAnswerIndex: PropTypes.number,
  // Functions
  deleteAnswer: PropTypes.func.isRequired,
  onChangeRightAnswer: PropTypes.func.isRequired,
  // Passed and Used in State
  type: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  onChangeAnswerContent: PropTypes.func.isRequired,
  onChangeAnswerType: PropTypes.func.isRequired,
};

export default Answer;
