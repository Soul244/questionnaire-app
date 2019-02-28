import React from 'react';
import PropTypes from 'prop-types';

import {
  Row, Col, Progress,
} from 'reactstrap';
import styled from 'styled-components';

import {
  Question, Options, Last, First,
} from './Shared';

const ProgressContainer = styled.div`
  margin-bottom: 1rem;
`;

const QuestionContainer = styled.div`
  margin-bottom: 7rem;
`;

class Full extends React.Component {
  static propTypes = {
    testStarted: PropTypes.string.isRequired,
    handleTestStarted: PropTypes.func.isRequired,
    addParticipantAnswer: PropTypes.func.isRequired,
    postParticipant: PropTypes.func.isRequired,
    participant: PropTypes.object.isRequired,
    poll: PropTypes.object.isRequired,
  };
  
  constructor(props) {
    super(props);
    this.state = {
      progressValue: 0,
    };
  }

  render() {
    const { progressValue } = this.state;

    const {
      testStarted,
      handleTestStarted,
      addParticipantAnswer,
      postParticipant,
      participant,
      poll,
    } = this.props;

    const {
      questions, answers, name, desc, lastDesc,
    } = poll;

    const { userDataCollectType, type } = poll.settings;

    return (
      <div>
        {/* IF POLL IS STARTED, SHOW POLL DATA' */}
        {!testStarted && (
          <First
            name={name}
            desc={desc}
            handleTestStarted={handleTestStarted}
          />
        )}
        {/* 'TEST BAŞLADIYSA TEST İLE İLGİLİ VERİLERİ GÖSTER' */}
        {testStarted && (
        <Row>
          <ProgressContainer>
            <Progress value={progressValue} max={100} />
          </ProgressContainer>
          <Col>
            {questions.map((question, index) => (
              <QuestionContainer key={`poll${index}`}>
                <Row>
                  <Question
                    type={question.type}
                    content={question.content}
                    index={question.index}
                    desc={question.desc}
                  />
                </Row>
                <Row>
                  <Options
                    answers={answers}
                    questionCount={question.count}
                    questionIndex={question.index}
                    rightAnswerIndex={question.rightAnswerIndex}
                    changeQuestion={() => {}}
                    addParticipantAnswer={addParticipantAnswer}
                  />
                </Row>
              </QuestionContainer>
            ))}
            <Last
              name={name}
              lastDesc={lastDesc}
              pollId={poll._id}
              participant={participant}
              postParticipant={postParticipant}
              userDataCollectType={userDataCollectType}
              selectableLastMessages={poll.selectableLastMessages}
              type={type}
            />
          </Col>
        </Row>
        )}
      </div>
    );
  }
}

export default Full;
