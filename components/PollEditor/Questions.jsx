import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Question from './Question';
import * as pollActions from '../../redux/actions/pollActions';

class Questions extends React.Component {
  constructor(props){
    super(props)
    this.state={
      questions: this.props.poll.questions
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.poll.questions.length!==state.questions) {
      return {
        questions: props.poll.questions,
      };
    }

    // Return null if the state hasn't changed
    return null;
  }

  render() {
    const { pollActions, poll } = this.props;
    const {questions} = this.state;
    const {deleteQuestion}=pollActions;
    return (
      <ul>
        {questions.map((question, index) => (
          <Question
            key={index}
            deleteQuestion={deleteQuestion}
            order={question.order}
            type={question.type}
            desc={question.desc}
            rightAnswerOrder={question.rightAnswerOrder}
            content={question.content}
          />
        ))}
      </ul>
    );
  }
}

Questions.propTypes = {
  poll: PropTypes.object.isRequired,
  pollActions: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  poll: state.poll
});

const mapDispatchToProps = dispatch => ({
  pollActions: bindActionCreators(pollActions, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Questions);