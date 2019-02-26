import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import Answer from './Answer';
import * as pollActions from '../../redux/actions/pollActions';

class Answers extends React.Component {
  constructor(props){
    super(props)
    this.state={
      rightAnswerOrder:null,
    }
  }

  componentDidMount(){
    this.setState({
      rightAnswerOrder: this.props.rightAnswerOrder,
    });
  }
  
  onChangeRightAnswer = order => {
    this.setState({
      rightAnswerOrder: order
    });
    const { questionOrder } = this.props;
    this.props.onClickRightAnswer(questionOrder, order);
  };

  render() {
    const { answers, questionOrder, poll } = this.props;
    const {deleteAnswer, onChangeAnswer, onChangeAnswerType} = this.props.pollActions;
    const {rightAnswerOrder} = this.state;
    return (
      <ul>
        {answers.map((answer, index) => (
          <Answer
            key={index}
            order={answer.order}
            questionOrder={questionOrder}
            type={answer.type}
            content={answer.content}
            pollType={poll.settings.type}
            rightAnswerOrder={rightAnswerOrder}
            deleteAnswer={deleteAnswer}
            
            onChangeAnswer={onChangeAnswer}
            onChangeAnswerType={onChangeAnswerType}
            onChangeRightAnswer={this.onChangeRightAnswer}
          />
        ))}
      </ul>
    );
  }
}

Answers.propTypes = {
  answers: PropTypes.array.isRequired,
  questionOrder: PropTypes.number.isRequired,
  poll: PropTypes.object.isRequired,
  rightAnswerOrder: PropTypes.number,
  pollActions: PropTypes.shape({
    deleteAnswer: PropTypes.func.isRequired
  })
};

const mapStateToProps = state => ({
  poll: state.poll
});

const mapDispatchToProps = dispatch => ({
  pollActions: bindActionCreators(pollActions, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Answers);
