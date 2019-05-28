import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Card, CardBody, CardHeader,
} from 'reactstrap';
import styled from 'styled-components';
import { SortableElement } from 'react-sortable-hoc';
import { ContentViewer, InputBox } from '~Shared';
import { SortableButton } from '~Sortable';
import colors from '~css/colors';

const AnswerContainer = styled.div`
  padding-top: 1rem;
`;

const CardHeaderStyled = styled(CardHeader)`
  display: flex;
  align-items: center;
  background-color: ${props => (props.checked ? colors.trueColor : '')};
`;

const ContentContainer = styled.div` 
    margin: 1rem 0 0 1rem;
`;

const RightContainer = styled.div`
    margin-left: auto;
`;

@SortableElement
class Answer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDelete: false,
    };
  }

  toggleDelete =() => {
    this.setState(prevState => ({
      showDelete: !prevState.showDelete,
    }));
  }

  render() {
    const {
      index,
      questionIndex,
      rightAnswerIndex,
      // Answer Functions
      onChangeAnswerContent,
      onChangeAnswerType,
      deleteAnswer,
      onChangeRightAnswer,
      // Answer Data
      type,
      content,
      pollType,
    } = this.props;
    const isTrue = rightAnswerIndex === index;
    return (
      <Card className="my-4" outline={isTrue} color={isTrue ? 'success' : ''}>
        <CardHeaderStyled tag="h6" checked={isTrue ? 1 : 0}>
          {`${index + 1}. Cevap`}
          {' '}
          <RightContainer>
            <SortableButton />
          </RightContainer>
        </CardHeaderStyled>
        <CardBody>
          <AnswerContainer>
            <InputBox
              index={index}
              typeValue={type}
              inputValue={content}
              hasRadio={pollType === 'test'}
              checked={isTrue ? 1 : 0}
              radioChange={() => onChangeRightAnswer(index, questionIndex)}
              onChangeInput={e => onChangeAnswerContent(e.target.value, index, questionIndex)}
              onChangeType={e => onChangeAnswerType(e.target.value, index, questionIndex)}
              handleDelete={() => deleteAnswer(index, questionIndex)}
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
