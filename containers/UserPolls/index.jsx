import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Router from 'next/router';
import PropTypes from 'prop-types';

import * as userActions from '../../redux/actions/userActions';
import * as pollsActions from '../../redux/actions/pollsActions';
import { PollList } from '../../components/UserPolls';
import { Loading } from '../../components/Shared';

class UserPolls extends Component {
  componentDidMount() {
    const token = localStorage.getItem('token');
    const { userid, pollsActions } = this.props;
    if (!token && token === '') {
      Router.push({ pathname: '/giris-yap' });
    } else {
      const { getPolls } = pollsActions;
      getPolls(userid);
    }
  }

  render() {
    const {
      polls, message, fetching, fetched,
    } = this.props.polls;
    const { deletePoll } = this.props.pollsActions;
    if (fetching && !fetched) {
      return (
        <Loading />
      );
    }
    return (
      <>
        <Container className="my-4">
          <Row>
            <Col>
              <PollList
                polls={polls}
                message={message}
                deletePoll={deletePoll}
              />
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

UserPolls.propTypes = {
  polls: PropTypes.shape({
    polls: PropTypes.array.isRequired,
    message: PropTypes.string.isRequired,
    fetched: PropTypes.bool.isRequired,
    fetching: PropTypes.bool.isRequired,
  }).isRequired,
  pollsActions: PropTypes.shape({
    getPolls: PropTypes.func.isRequired,
    deletePoll: PropTypes.func.isRequired,
  }).isRequired,
};

function mapStateToProps(state) {
  return {
    user: state.user,
    polls: state.polls,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(userActions, dispatch),
    pollsActions: bindActionCreators(pollsActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserPolls);
