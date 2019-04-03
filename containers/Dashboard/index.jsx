import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Router from 'next/router';
import PropTypes from 'prop-types';

import { Row, Col } from 'reactstrap';

import * as userActions from '../../redux/actions/userActions';
import * as pollActions from '../../redux/actions/pollActions';
import { TableList, MasonryList } from '../../components/Dashboard';
import { Loading } from '../../components/Shared';
import withAuth from '../../hoc/withAuth';
import withNavbar from '../../hoc/withNavbar';

@withNavbar
@withAuth
class Dashboard extends Component {
  componentDidMount() {
    const token = localStorage.getItem('token');
    const { pollActions } = this.props;
    if (!token && token === '') {
      Router.push({ pathname: '/giris-yap' });
    } else {
      const { getPolls } = pollActions;
      getPolls();
    }
  }

  render() {
    const { pollReducer, pollActions } = this.props;
    const {
      polls, message, fetching, fetched,
    } = pollReducer;
    const { deletePoll } = pollActions;
    if (fetching && !fetched) {
      return (
        <Loading />
      );
    }
    return (
      <>
        <Row>
          <Col md="12">
            <MasonryList polls={polls} />
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <TableList
              polls={polls}
              message={message}
              deletePoll={deletePoll}
            />
          </Col>
        </Row>
      </>
    );
  }
}

Dashboard.propTypes = {
  pollReducer: PropTypes.shape({
    polls: PropTypes.array,
    message: PropTypes.string,
    fetched: PropTypes.bool.isRequired,
    fetching: PropTypes.bool.isRequired,
  }).isRequired,
  pollActions: PropTypes.shape({
    getPolls: PropTypes.func.isRequired,
    deletePoll: PropTypes.func.isRequired,
  }).isRequired,
};

function mapStateToProps(state) {
  return {
    userReducer: state.userReducer,
    pollReducer: state.pollReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(userActions, dispatch),
    pollActions: bindActionCreators(pollActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard);
