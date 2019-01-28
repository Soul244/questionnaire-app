import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Router from 'next/router';
import PropTypes from 'prop-types';

import styled from 'styled-components';

import * as userActions from '../../redux/actions/userActions';
import * as pollsActions from '../../redux/actions/pollsActions';
import { PollList } from '../../components/Home';
import { Navbar } from '../../components/Shared';

const RedirectContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  -moz-transform: translateX(-50%) translateY(-50%);
  -webkit-transform: translateX(-50%) translateY(-50%);
  transform: translateX(-50%) translateY(-50%);
`;

class Home extends Component {
  componentDidMount() {
    const auth = localStorage.getItem('auth');
    if (auth === '' || auth === null) {
      Router.push({ pathname: '/giris-yap' });
    } else {
      const jsonAuth = JSON.parse(auth);
      const { getPolls } = this.props.pollsActions;
      getPolls(jsonAuth.id);
    }
  }

  render() {
    const { polls, message } = this.props.polls;
    const { deletePoll } = this.props.pollsActions;
    return (
      <>
        <Navbar />
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

Home.propTypes = {
  polls: PropTypes.shape({
    polls: PropTypes.array.isRequired,
    message: PropTypes.string.isRequired,
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
)(Home);
